import { useSelector } from "react-redux";

const Buttons = ({filterDishes}) => {
    const filter = useSelector((state) => state.filter.filter);
    const categories = useSelector((state) => state.categories.categories);

    const categoryButtons = categories.map((category) => {
        const cssClass = +filter === category.id ? "filter__btn filter__btn--active" : "filter__btn";

        return (
            <button
                className={cssClass}
                id={category.id}
                value={category.name}
                key={category.name}
                onClick={filterDishes}
                type="button"
            >
                {category.name}
            </button>
        );
    });

    return <div className="filter__buttons">{categoryButtons}</div>;
};

export default Buttons;
