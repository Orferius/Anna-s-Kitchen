import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "./../../helpers/api";
import "./../../styles/authorization.css";

const USER_REGEX = /^[а-яА-ЯёЁa-zA-Z0-9]{4,16}$/;
const PWD_REGEX = /^[a-zA-Z0-9]{6,18}$/;
const SIGNUP_URL = '/users/auth/sign_up/';

const Signup = () => {
    document.body.className = "auth-bg";

    const userRef = useRef();
    const passRef = useRef();
    const matchRef = useRef();
    const errorRef = useRef();

    const [username, setUsername] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(username);
        setValidName(result);
    }, [username]);

    useEffect(() => {
        const result = PWD_REGEX.test(password);
        setValidPassword(result);
        const match = password === matchPassword;
        setValidMatch(match);
    }, [password, matchPassword]);

    useEffect(() => {
        setErrorMessage("");
    }, [username, password, matchPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                SIGNUP_URL,
                JSON.stringify({username, password}),
                {
                    headers: {'Content-Type' : 'application/json'},
                    withCredentials: true
                }
            );
            setSuccess(true);
        } catch (error) {
            if (!error?.response) {
                setErrorMessage('Нет ответа от сервера');
            } else if (error?.request.response === "{\"username\":[\"A user with that username already exists.\"]}") {
                setErrorMessage('Это имя пользователя уже занято');
            } else {
                setErrorMessage('Ошибка регистрации')
            }
            errorRef.current.focus();
        }
    };

    return (
        <>
            {success ? (
                <div className="login-page">
                    <div className="form">
                        <p className="p__success">Регистрация прошла успешно!</p>
                        <Link to="/login" className="success">Войти в аккаунт</Link>
                    </div>
                </div>
            ) : (
                <div className="login-page">
                    <div className="form">
                    <p
                        ref={errorRef}
                        className={errorMessage ? "errmsg" : "offscreen"}
                        aria-live="assertive"
                    >
                        {" "}{errorMessage}{" "}
                    </p>
                        <div className="logo"></div>
                        <form className="register-form" onSubmit={handleSubmit}>
                            <div>
                                <input
                                    type="text"
                                    placeholder="имя пользователя"
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    aria-invalid={validName ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    onFocus={() => setUserFocus(true)}
                                    onBlur={() => setUserFocus(false)}
                                    onKeyDown={(e) => {
                                        const { key } = e;
                                        if (key === "Enter") {
                                            passRef.current.focus();
                                        }
                                    }}
                                    className={validName ? "valid" : "form__input"}
                                />
                                <p
                                    id="uidnote"
                                    className={userFocus && !validName ? "instructions" : "offscreen"}
                                >
                                    Имя пользователя должно содержать от 4 до 16 символов.
                                    <br />
                                    Можно использовать латинские буквы, кириллицу и цифры.
                                </p>

                                <input
                                    type="password"
                                    placeholder="введите пароль"
                                    ref={passRef}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    aria-invalid={validPassword ? "false" : "true"}
                                    aria-describedby="pwdnote"
                                    onFocus={() => setPasswordFocus(true)}
                                    onBlur={() => setPasswordFocus(false)}
                                    onKeyDown={(e) => {
                                        const { key } = e;
                                        if (key === "Enter") {
                                            matchRef.current.focus();
                                        }
                                    }}
                                    className={validPassword ? "valid" : "form__input"}
                                />
                                <p
                                    id="pwdnote"
                                    className={passwordFocus && !validPassword ? "instructions" : "offscreen"}
                                >
                                    Пароль должен содержать от 6 до 18 символов.
                                    <br />
                                    Можно использовать латинские буквы, цифры.
                                </p>

                                <input
                                    type="password"
                                    placeholder="подтвердите пароль"
                                    ref={matchRef}
                                    onChange={(e) => setMatchPassword(e.target.value)}
                                    required
                                    aria-invalid={validMatch ? "false" : "true"}
                                    aria-describedby="confirmnote"
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                    className={validMatch && matchPassword ? "valid" : "form__input"}
                                />
                                <p
                                    id="confirmnote"
                                    className={matchFocus && !validMatch ? "instructions" : "offscreen"}
                                >
                                    Пароли не совпадают.
                                </p>

                                <button
                                    disabled={!validName || !validPassword || !validMatch ? true : false}
                                    type="submit"
                                >
                                    Создать
                                </button>
                            </div>

                            <p className="message">
                                Уже зарегистрированы?{" "}
                                <Link to="/login">Войти</Link>
                            </p>

                        </form>
                    </div>
                    <Link to="/" className="back__link">
                        Вернуться на главную
                    </Link>
                </div>
            )}
        </>
    );
};

export default Signup;