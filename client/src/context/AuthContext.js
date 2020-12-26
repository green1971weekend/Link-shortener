import {createContext} from "react";

function noop() {}

// token, login, logout values etc. are passed to the whole application context.
export const AuthContext = createContext({
    token: null,
    userId: null,
    login: noop,
    logout: noop,
    isAuthenticated: false
});
