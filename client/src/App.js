import React from "react";
import { useRoutes } from "./routes";
import {BrowserRouter as Router} from "react-router-dom";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import { Loader } from "./components/Loader";

import "materialize-css";


function App() {
   // Retreives these values for passing them to context.
  const {token, login, logout, userId, ready} = useAuth();
   // 2 exclamation points is cast to boolean type
  const isAuthenticated = !!token; 
  const routes = useRoutes(isAuthenticated);
 
  if(!ready) {
    return <Loader/>
  }
  return (
    // token, login, logout values etc. are passed to the whole application context.
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      {/* For correct route processing wraping {routes} in Router is neccessary */}
      <Router>
        { isAuthenticated && <Navbar />}
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
