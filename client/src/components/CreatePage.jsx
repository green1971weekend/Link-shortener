import React, {useState, useEffect, useContext} from "react";
import { AuthContext } from "../context/AuthContext.js";
import {useHttp} from "../hooks/http.hook.js";
import {useHistory} from "react-router-dom";

export const CreatePage = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const [link, setLink] = useState("");
    const {request} = useHttp();

    const pressHandler = async event => {
        if(event.key === "Enter") {
            try {
                const data = await request("api/link/generate", "POST", {from: link}, {
                    Authorization: `Bearer ${auth.token}`,
                    "Content-Type": "application/json"
                });
                history.push(`/detail/${data.link._id}`);
            } catch (e) {}
        }
    }

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    return(
        <div className="row">
            <h1>Create Page</h1>
            <div className="col s8 offset-s2" style={{paddingTop: "2rem"}}>
                <div className="input-field">
                    <input placeholder="Enter link" 
                            id="link" 
                            type="text"
                            value={link}
                            onChange={e => setLink(e.target.value)}
                            onKeyPress={pressHandler} />
                    <label htmlFor="link">Enter link</label>
                </div>
            </div>
        </div>
    );
}