import { useSelector } from "react-redux";

const Dishes = ({ addToFavs }) => {
    const dishes = useSelector((state) => state.dishes.dishes);
    const favs = useSelector((state) => state.favs.favs);

    const filteredDishes = dishes.map((dish) => {
        const cssClass = favs.includes(dish.id)
            ? "like-button like-button--active"
            : "like-button";

        return (
            <div className="col-xs-12 col-md-6 col-lg-4" key={Math.random()}>
                <div className="top__card" id={dish.id}>
                    <img
                        src={dish.picture}
                        alt={dish.name}
                        className="top__card-thumb"
                    />
                    <div className="top__card-stats">
                        <span className="top__card-fulltitle">
                            <h3 className="top__card-title">{dish.name}</h3>
                            <i onClick={addToFavs} className={cssClass}>
                                ❤
                            </i>
                        </span>
                        <span className="top__card-ingr">
                            {dish.ingredients}
                        </span>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className="container">
            <div className="row">
                {dishes.length > 0 ? (
                    <div className="top__cards">{filteredDishes}</div>
                ) : (
                    <h2 className="no__favs no__favsCategories">
                        В этой категории пока нет блюд
                    </h2>
                )}
            </div>
        </div>
    );
};

export default Dishes;