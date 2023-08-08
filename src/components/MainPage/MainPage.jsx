import { useEffect, useContext, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "../../helpers/api";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import AuthContext from "../../context/AuthProvider";
import Buttons from "./Menu/Buttons";
import Dishes from "./Menu/Dishes";
import { setDishes } from "../../store/dishesReducer";
import { setFilter } from "../../store/filterReducer";
import { setCategories } from "../../store/categoriesReducer";
import { setFavs } from "../../store/favsReducer";

const MainPage = () => {
    document.body.className = "main-bg";

    const location = useLocation();
    const favLocation = location.pathname === "/favs";

    let [title, setTitle] = useState();

    const dispatch = useDispatch();
    const filter = useSelector((state) => state.filter.filter);
    const favs = useSelector((state) => state.favs.favs);

    const axiosPrivate = useAxiosPrivate();
    const DISHES_URL = `/dishes/?${filter === "9" ? "" : `category=${filter}`}`;
    const FAVS_URL = `/dishes/?is_favourite=true&${filter === "9" ? "" : `category=${filter}`}`;
    const FAVSIDS_URL = `/dishes/?is_favourite=true`;

    const { auth } = useContext(AuthContext);
    const loggedIn = Object.keys(auth).length === 1;

    const getTitle = useCallback((loggedIn, pathname) => {
        if (pathname === "/") {
            loggedIn
                ? setTitle("Выберите, чем хотите полакомиться сегодня")
                : setTitle("Пожалуйста войдите в аккаунт для просмотра блюд");
        } else if (pathname === "/favs") {
            loggedIn
                ? setTitle("Избранное")
                : setTitle("Пожалуйста войдите в аккаунт для просмотра избранных блюд");
        }
    }, []);

    useEffect(() => {
        getTitle(loggedIn, location.pathname);
        if (loggedIn && location.pathname === "/") {
            axiosPrivate
                .get(DISHES_URL)
                .then((response) => dispatch(setDishes(response.data.results)));
        } else if (loggedIn && favLocation) {
            axiosPrivate
                .get(FAVS_URL)
                .then((response) => dispatch(setDishes(response.data.results)));
        }
    }, [axiosPrivate, loggedIn, dispatch, location.pathname, favLocation, getTitle, DISHES_URL, FAVS_URL ]);

    useEffect(() => {
        if (loggedIn) {
            axios
                .get("/categories/")
                .then((response) =>
                    dispatch(setCategories(response.data.results))
                );
        }
    }, [loggedIn, dispatch]);

    const getFavs = useCallback(async () => {
        if (loggedIn) {
            const response = await axiosPrivate.get(FAVSIDS_URL);
            const data = await response.data.results;
            const favourites = data.map((item) => item.id);
            dispatch(setFavs(favourites));
        }
    }, [axiosPrivate, loggedIn, dispatch, FAVSIDS_URL]);

    const addToFavs = async (e) => {
        const currentID = e.target.closest(".top__card").id;
        await axiosPrivate.post(`/dishes/favourite/${currentID}`);
        await getFavs();
        if (favLocation) {
            await axiosPrivate
                .get(FAVS_URL)
                .then((response) => dispatch(setDishes(response.data.results)));
        }
    };

    useEffect(() => {
        getFavs();
    }, [getFavs]);

    const filterDishes = (e) => dispatch(setFilter(e.target.id));

    let markup = 
                <div className="wrapper-main">
                    <Buttons filterDishes={filterDishes}/>
                    <Dishes addToFavs={addToFavs} />
                </div>;
                
    const loggedInFavs = loggedIn && favLocation;

    return (
        <main className={loggedInFavs && !favs.length ? "top topLoggedOut" : loggedIn ? "top" : "top topLoggedOut"}>
            <h2 className={loggedIn ? "top__title" : "top__title top__titleLoggedOut"}>{title}</h2>
            {
                loggedInFavs && !favs.length ? <h2 className="no__favs">Вы пока не добавили ни одного блюда в избранное</h2>
                : loggedInFavs && favs.length ? markup
                : loggedIn ? markup : null
            }
        </main>
    );
};

export default MainPage;