import { useState, useCallback } from "react";


// useHttp is custom hook for interacting with server. Instead of using fetch or axios in each page, better solution would be using our own hook.
export const useHttp = () => {  
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState(null);


    //useCallback takes 2 parameters: 1-st - callback function; 2-nd - set of dependencies for callback.
    const request = useCallback( async (url, method = "GET", body = null, headers = { "Content-Type": "application/json" }) => {    // Using callback for preventing entering in recursion by react
        setLoading(true);

        try {
            if (body) {
                body = JSON.stringify(body)
            }

            const response = await fetch(url, {
                method: method,
                headers: headers,
                body: body
            });

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message || "Something went wrong during making a request.");
            }
            setLoading(false);
            return data;

        } catch (e) {
            setLoading(false);
            setError(e.message);
            throw e; // Throwing again the error for processing it in components.  
        }
    }, []);


    const clearError = useCallback(() => setError(null), []); // !!! useCallBack is necessary for correct error message output.

    return { loading, error, request, clearError }
}