import { set } from "mongoose";
import React, { useCallback, useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { Loader } from "./Loader";
import { LinkCard } from "./LinkCard";

export const DetailPage = () => {
    const {token} = useContext(AuthContext);
    const {request, loading} = useHttp();
    const [link, setLink] = useState(null);
    //useParams().id returns id which taken from defined route /detail/:id
    const linkId = useParams().id;

    const getLink = useCallback(async () => {
        try{
            const fetched = await request(`/api/link/${linkId}`, "GET", null, {
                Authorization: `Bearer ${token}`
            });
            setLink(fetched);
        } catch (e){

        }
    }, [token, linkId, request]);

    useEffect(() => {
        getLink();
    }, [getLink]);

    if(loading) {
        return <Loader />
    }

    return(
        <>
            { !loading && link && <LinkCard link={link}/>}
        </>
    );
}