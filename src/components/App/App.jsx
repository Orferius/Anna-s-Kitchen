import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../../context/AuthProvider";
import Login from "../Authorization/Login";
import Signup from "../Authorization/Signup";
import NotFound from "../NotFoundPage/NotFoundPage";
import MainPage from "../MainPage/MainPage";
import PersistLogin from "../../helpers/persistLogin";

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route element={<PersistLogin/>}>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/favs" element={<MainPage />}/>
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;
