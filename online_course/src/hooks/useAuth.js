import { useState } from "react";
import {
    loginUser,
    registerUser,
    logoutUser,
    getUser,
} from "../utils/auth";

const useAuth = () => {
    const [user , setUser] = useState(() => getUser());
    const [loading , setLoading] = useState(false);

    const login = async (credentials) => {
        setLoading(true);
        try {
            const loggedInUser = loginUser(credentials);
            setUser(loggedInUser);
            return { success: true};
        } catch (error){
            return { success: false, message: error.message };
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        setLoading(true);
        try{
            const newUser = registerUser(userData);
            return { success: true , user: newUser };
        } catch(error) {
            return {success: false , message: error.message};
        }finally{
            setLoading(false);
        }
    };

    const logout = () => {
        logoutUser();
        setUser(null);
    };

    return {
        user , 
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user
    };
};

export default useAuth;