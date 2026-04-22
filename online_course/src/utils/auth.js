import {
    getUsers,
    saveUsers,
    setCurrentUser,
    getCurrentUser,
    removeCurrentUser
} from "./storage";

export const registerUser = ({ name, email, password, role }) => {
    const users = getUsers();

    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
        throw new Error("User already exists");
    }

    const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        role
    };

    users.push(newUser);
    saveUsers(users);

    return newUser;
};

export const loginUser = ({ email, password }) => {
    const users = getUsers();

    const user = users.find((u) => u.email === email);

    if (!user) {
        throw new Error("User not found");
    }

    if (user.password !== password) {
        throw new Error("Invalid password");
    }

    setCurrentUser(user);
    return user;
};

export const logoutUser = () => {
    removeCurrentUser();
};

export const getUser = () => {
    return getCurrentUser();
};