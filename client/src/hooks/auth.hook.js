import {useState, useCallback, useEffect} from "react";

const storageName = "userData";

// Hook for managing with token by login, logout.
export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [ready, setReady] = useState(false);
    const [userId, setUserId] = useState(null);

    // Wrapping login in useCallback is neccesary because of giving this login to useEffect dependencies.
    const login = useCallback((jwt, id) => {
        setToken(jwt);
        setUserId(id);

        localStorage.setItem(storageName, JSON.stringify({
            // Explicit passing of parameters like userId: id, helps evade warning with passing dependencies to useCallback.
            userId: id,
            token: jwt
        }));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);

        localStorage.removeItem(storageName);
    }, []);

    // Hook serves for token existence checking in local storage. If positive - writes data to local state.
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));

        if(data && data.token) {
            login(data.token, data.userId);
        }
        //setReady defines flag for request complete.
        setReady(true);
    }, [login]);


    return {login, logout, token, userId, ready}
}