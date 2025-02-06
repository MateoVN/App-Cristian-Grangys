import { createContext, useContext, useEffect, useState } from "react";

// Crear el contexto
const LoginContext = createContext();

// Crear el proveedor del contexto
export function LoginProvider({ children }) {
    const [user, setUser] = useState(null); 
    const [isInitializing, setIsInitializing] = useState(true);

    
    useEffect(() => {
        const storedData = localStorage.getItem("loginData");
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                setUser(parsedData);
            } catch (error) {
                console.error("Error al parsear los datos del localStorage:", error);
            }
        }
        setIsInitializing(false);
    }, []);

    const logout = () => {
        localStorage.removeItem("loginData"); 
        setUser(null); 
    };


    return (
        <LoginContext.Provider value={{ user, setUser, logout, isInitializing }}>
            {children}
        </LoginContext.Provider>
    );
}

// Hook personalizado para consumir el contexto
export const useLogin = () => useContext(LoginContext);