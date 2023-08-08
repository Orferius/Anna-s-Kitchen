import Navigation from "./Navigation";
import { Link } from "react-router-dom";

const MainHeader = () => {
    return (
        <header className="header">
            <div className="header__wrapper">
                <div className="header__logo">
                    <Link to="/" className="header__logo-link">
                        <h2 className="header__logo-text">Anna`s Kitchen</h2>
                    </Link>
                </div>

                <Navigation/>
            </div>
        </header>
    );
}
 
export default MainHeader;