import { Link } from "react-router-dom";

const NotFound = () => {
    document.body.className = "auth-bg";

    return (
        <div className="content">
            <div className="text">
                <h1 className="error">404</h1>
                <p className="not-found">Страница не найдена</p>
                <Link to="/" className="back__link404"> Вернуться на главную </Link>
            </div>
        </div>
    );
};

export default NotFound;
