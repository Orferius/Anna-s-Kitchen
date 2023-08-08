import { Link } from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../../context/AuthProvider";
import { axiosPrivate } from "../../helpers/api";

const Navigation = () => {
	const { auth, setAuth } = useContext(AuthContext);

    const logout = async () => {
		await axiosPrivate.post('/users/auth/logout/');
        setAuth({});
    }

	const loggedIn = Object.keys(auth).length;

    return (
        <nav className="header__nav">
			<ul className="header__list">
				<li className="header__item"><Link to="/" className="header__link">Главная</Link></li>
				<li className="header__item"><Link to="/favs" className="header__link">Избранное</Link></li>
				{loggedIn === 0 && <li className="header__item"><Link to="/login" className="header__link">Войти</Link></li>}
				{loggedIn > 0 && <li className="header__item"><Link to="/login" className="header__link" onClick={logout}>Выйти</Link></li>}
			</ul>
		</nav>
    );
}
 
export default Navigation;