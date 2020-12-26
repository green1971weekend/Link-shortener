import React, {useState, useEffect, useContext} from "react";
import { AuthContext } from "../context/AuthContext.js";
import {useHttp} from "../hooks/http.hook.js";
import {useHistory} from "react-router-dom";
import { useMessage } from "../hooks/message.hook.js";

export const CreatePage = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const [link, setLink] = useState("");
    const {request, error, clearError} = useHttp();

    const message = useMessage();

    useEffect(() => {
        message(error);
        clearError();    
    }, [error, message, clearError]);

    // Regular expression for input link validation.
    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);

    const pressHandler = async event => {
        if(event.key === "Enter" || event.target.id === "convert") {
            try {
                if(link === "" || !link.match(regex)) {
                    throw new Error("Please enter valid link for conversion");
                }
                const data = await request("api/link/generate", "POST", {from: link}, {
                    Authorization: `Bearer ${auth.token}`,
                    "Content-Type": "application/json"
                });
                //history.push() makes redirect to /detail/link._id page defined in routes.jsx
                // _id property assigns moongose module
                history.push(`/detail/${data.link._id}`);
            } catch (e) {
                message(e.message);
            }
        }
    }

    useEffect(() => {
        //updateTextFields allows make inputs in active mode.
        window.M.updateTextFields();
    }, []);

    return(
        <div className="row">
            <h1>Create your short link</h1>
            <div className="col s8 offset-s2" style={{paddingTop: "2rem"}}>
                <div className="input-field">
                    <input placeholder="Enter link"
                            className="yellow-input" 
                            id="link" 
                            type="text"
                            value={link}
                            onChange={e => setLink(e.target.value)}
                            onKeyPress={pressHandler} />
                    <label htmlFor="link">Enter link</label>
                </div>
                <button className="btn waves-effect waves-light light-blue darken-2"
                 type="submit" 
                 name="action"
                 id="convert"
                 onClick={pressHandler}>
                     Convert
                </button>
            </div>
        </div>
    );
}