import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import MainHeader from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    }, [refresh, auth?.accessToken]);

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`);
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
    }, [isLoading, auth?.accessToken]);

    return (
        <>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {" "}<MainHeader /> <Outlet /> <Footer />{" "}
                </>
            )}
        </>
    );
};

export default PersistLogin;
