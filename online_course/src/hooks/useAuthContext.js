import { useContext } from "react";
import { AuthContext } from "../context/AuthContextObject";

const useAuthContext = () => {
    return useContext(AuthContext);
};

export default useAuthContext;
