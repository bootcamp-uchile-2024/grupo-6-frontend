import React, { createContext, useContext, useState } from "react";

// Esto para crear el contexto 
const AuthContext = createContext<any>(null);

// Provedor del contexto
export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null); // Esto nos permite agregar el estado para el usuario

    const login = (userData: { correoElectronico: string; contrasena: string; isAdmin?: boolean}) => {
        setIsAuthenticated(true);
        setUser(userData);
    } 

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null); // Esto nos permite limpiar la info del usuario al cerrar sesión
    } 

    return(
        <AuthContext.Provider value= {{ isAuthenticated, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para poder usar el contexto:
export const useAuth = () => {
    return useContext(AuthContext);
};