//authContext.jsx

import { createContext, useContext, useState } from "react";

// Create Context
const AuthContext = createContext();

// Create Provider
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Login
    const login = (userData) => {
        setUser(userData);
    };

    // Logout
    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Export Provider
export default AuthProvider;

// Custom Hook
const useAuth = () => {
    return useContext(AuthContext);
};

// Export Hook
export { useAuth };

