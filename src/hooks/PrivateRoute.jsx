import { Navigate } from "react-router-dom";
import { useLogin } from "../context/LoginContext";

export function PrivateRoute({ children }) {
    const { user, isInitializing } = useLogin();

    
    if (isInitializing) {
        return <div>Loading...</div>;
    }

    if (!user || !user.access_token) {
        console.log("Usuario no autenticado, redirigiendo al login.");
        return <Navigate to="/" replace />;
    }

    return children;
}