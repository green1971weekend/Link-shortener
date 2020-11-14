import React, { useEffect, useState } from "react";
import {useHttp} from "../../hooks/http.hook.js";
import { useMessage } from "../../hooks/message.hook.js";

import "./AuthPage.css";

export const AuthPage = () => {

    const message = useMessage();
    const {loading, error, request, clearError} = useHttp();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        message(error);
        clearError();    
    }, [error, message, clearError])

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value}); //[event.target.name] - dynamic key. The necessary value will be selected depending on the changed input value.
    }

    const registerHandler = async () => {
        try {
            const data = await request("/api/auth/register", "POST", {...form} ); // *Because of ports value diffrence between back-end and front-end parts we need to add in client package.json proxy part which will tell front-end make requests by pointed port in development mode.*
            message(data.message);
        } catch (e) {  }    //catch here remains empty because it already processed in http hook.
    }

    const loginHandler = async () => {
        try {
            const data = await request("/api/auth/login", "POST", {...form} ); // *Because of ports value diffrence between back-end and front-end parts we need to add in client package.json proxy part which will tell front-end make requests by pointed port in development mode.*
            message(data.message);
        } catch (e) {  }    //catch here remains empty because it already processed in http hook.
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
                                        className="yellow-input"
                                        onChange={changeHandler} />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input placeholder="Enter your password" 
                                        id="password" 
                                        type="password"
                                        name="password"
                                        className="yellow-input"
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