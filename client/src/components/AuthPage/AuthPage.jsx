import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.js";
import {useHttp} from "../../hooks/http.hook.js";
import { useMessage } from "../../hooks/message.hook.js";

import "./AuthPage.css";

export const AuthPage = () => {

    // Now this variable contains all data which transfered by AuthContext.Provider
    const auth = useContext(AuthContext); 
    const message = useMessage();
    const {loading, error, request, clearError} = useHttp();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        message(error);
        clearError();    
    }, [error, message, clearError]);

    useEffect(() => {
        //updateTextFields allows make inputs in active mode.
        window.M.updateTextFields();
    }, []);

    const changeHandler = (event) => {
         //[event.target.name] - dynamic key. The necessary value will be selected depending on the changed input value.
        setForm({...form, [event.target.name]: event.target.value});
    }

    const registerHandler = async () => {
        try {
            // *Because of ports value diffrence between back-end and front-end parts we need to add in client package.json proxy part which will tell front-end make requests by pointed port in development mode.*
            const data = await request("/api/auth/register", "POST", {...form} );
            message(data.message);
        //catch here remains empty because it already processed in http hook.
        } catch (e) {  }   
    }

    const loginHandler = async () => {
        try {
            // *Because of ports value diffrence between back-end and front-end parts we need to add in client package.json proxy part which will tell front-end make requests by pointed port in development mode.*
            const data = await request("/api/auth/login", "POST", {...form} ); 
            message(data.message);
            auth.login(data.token, data.userId);   
         //catch here remains empty because it already processed in http hook. 
        } catch (e) {  }  
    }

    return(
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Link Shortener</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div>
                            <div className="input-field">
                                <input placeholder="Enter your email" 
                                        id="email" 
                                        type="text"
                                        name="email"
                                        className="auth-yellow-input"
                                        value={form.email}
                                        onChange={changeHandler} />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input placeholder="Enter your password" 
                                        id="password" 
                                        type="password"
                                        name="password"
                                        className="auth-yellow-input"
                                        value={form.password}
                                        onChange={changeHandler} />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn yellow darken-4" onClick={loginHandler} disabled={loading}>Sign In</button>
                        <button className="btn grey lighten-1 black-text" onClick={registerHandler} disabled={loading}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}