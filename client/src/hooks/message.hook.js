import { useCallback } from "react";

// Hook for wrapping materialized output functionality
export const useMessage = () => {
    return useCallback((text) => {
        // window.M is materialized library which output styled message on html page 
        if (window.M && text) {
            window.M.toast({ html: text});
        }
    }, [])
}