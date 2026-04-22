import { useState } from "react";
import { AuthContext } from "./AuthContextObject";
import {
    loginUser,
    registerUser,
    logoutUser,
    getUser
} from "../utils/auth";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => getUser());
    const [loading, setLoading] = useState(false);

    const login = async (credentials) => {
        setLoading(true);
        try {
            const loggedInUser = loginUser(credentials);
            setUser(loggedInUser);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        setLoading(true);
        try {
            const newUser = registerUser(userData);
            setUser(newUser);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        logoutUser();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
                isAuthenticated: !!user
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
