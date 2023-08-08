import { Link } from "react-router-dom";
import "./../../styles/authorization.css";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./../../helpers/api";
import useAuth from "../../hooks/useAuth";

const LOGIN_URL = "/users/auth/login/";

const Login = () => {
    document.body.className = "auth-bg";

    const { setAuth } = useAuth();

    const userRef = useRef();
    const passRef = useRef();
    const errorRef = useRef();

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrorMessage("");
    }, [username, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({ username, password }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            const accessToken = response?.data?.access;
            setAuth({ accessToken });
            navigate("/");
        } catch (error) {
            if (!error?.response) {
                setErrorMessage("Нет ответа от сервера");
            } else if (error.response?.data.detail === "No active account found with the given credentials") {
                setErrorMessage("Некорректное имя пользователя или пароль");
            } else {
                setErrorMessage("Ошибка входа");
            }
            errorRef.current.focus();
        }
    };

    return (
        <div className="login-page">
            <div className="form">
                <p
                    ref={errorRef}
                    className={errorMessage ? "errmsg" : "offscreen"}
                    aria-live="assertive"
                >
                    {errorMessage}
                </p>
                <div className="logo"></div>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="имя пользователя"
                        ref={userRef}
                        autoComplete="on"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={(e) => {
                            const { key } = e;
                            if (key === "Enter") {
                                passRef.current.focus();
                            }
                        }}
                        required
                        className="form__input"
                    />
                    <input
                        type="password"
                        placeholder="пароль"
                        ref={passRef}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form__input"
                    />
                    <button
                        disabled={
                            !userRef.current?.value || !passRef.current?.value
                                ? true
                                : false
                        }
                        type="submit"
                    >
                        Войти
                    </button>
                    <p className="message">
                        Не зарегистрированы?{" "}
                        <Link to="/signup">Создать аккаунт</Link>
                    </p>
                </form>
            </div>
            <Link to="/" className="back__link">
                Вернуться на главную
            </Link>
        </div>
    );
};

export default Login;
