export const userInfo = () => {

    const getToken = () => {
        return localStorage.getItem("token");
    }

    const setToken = (token: string) => {
        return localStorage.setItem("token", token);
    }

    const removeToken = () => {
        localStorage.removeItem("token");
    }

    const setUser = (user: string) => {
        return localStorage.setItem("user", JSON.stringify(user));
    }

    const getUser = () => {
        return localStorage.getItem("user");
    }

    return {
        getToken,
        setToken,
        removeToken,
        setUser,
        getUser
    }
}