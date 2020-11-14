import React from "react";
import { useRoutes } from "./routes";
import {BrowserRouter as Router} from "react-router-dom";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import "materialize-css";


function App() {
  const {token, login, logout, userId} = useAuth();
  const isAuthenticated = !!token;  // 2 exclamation points is cast to boolean type
  const routes = useRoutes(isAuthenticated);
 
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <Router>
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
