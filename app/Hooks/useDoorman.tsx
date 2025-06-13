import { tokenUtils } from "@app/Utilities/AuthUtilities";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export function useDoorman(redirectTo = "/") {
    const navigate = useNavigate();
    useEffect(() => {
        if (!tokenUtils.getToken()) navigate(redirectTo, { replace: true });
    }, [navigate, redirectTo]);
}