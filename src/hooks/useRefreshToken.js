import axios from "../helpers/api";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.post(
            "/users/auth/jwt/refresh/",
            { headers: { "Content-Type": "application/json" } },
            { withCredentials: true }
        );
        setAuth((prev) => {
            return { ...prev, accessToken: response.data.access };
        });
        return response.data.accessToken;
    };
    return refresh;
};

export default useRefreshToken;
