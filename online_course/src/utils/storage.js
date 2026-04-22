const STORAGE_KEYS = {
    USER: "user",
    USERS: "users",
    TOKEN: "token",
    COURSES: "courses",
    EXAMS: "exams"
};

const defaultCourses = [
    { 
        id: 1, 
        title: "DSA", 
        category: "Programming",
        description: "Master Data Structures and Algorithms",
        duration: "8 weeks",
        price: "$99",
        image: "https://via.placeholder.com/300x200?text=DSA"
    },
    { 
        id: 2, 
        title: "FullStack", 
        category: "Programming",
        description: "Complete Full Stack Development Course",
        duration: "12 weeks",
        price: "$149",
        image: "https://via.placeholder.com/300x200?text=FullStack"
    },
    { 
        id: 3, 
        title: "DBMS", 
        category: "Database",
        description: "Learn Database Management Systems",
        duration: "6 weeks",
        price: "$79",
        image: "https://via.placeholder.com/300x200?text=DBMS"
    }
];

const defaultExams = [
    {
        id: 1,
        title: "DSA Basics",
        questions: [
            {
                question: "Time complexity of Binary Search?",
                options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
                answer: 1
            }
        ]
    }
];

export const saveUsers = (users) => {
    localStorage.setItem(STORAGE_KEYS.USERS , JSON.stringify(users));
};

export const getUsers = () => {
    const data = localStorage.getItem(STORAGE_KEYS.USERS);
    return data ? JSON.parse(data) : [];
};

export const setCurrentUser = (user) => {
    localStorage.setItem(STORAGE_KEYS.USER , JSON.stringify(user));
};

export const getCurrentUser = () => {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
};

export const removeCurrentUser = () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
}

export const clearStorage = () => {
    localStorage.clear();
};

export const getCourses = () => {
    const data = localStorage.getItem(STORAGE_KEYS.COURSES);
    if (!data) {
        saveCourses(defaultCourses);
        return defaultCourses;
    }
    return JSON.parse(data);
};

export const saveCourses = (courses) => {
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
};

export const getExams = () => {
    const data = localStorage.getItem(STORAGE_KEYS.EXAMS);
    if (!data) {
        saveExams(defaultExams);
        return defaultExams;
    }
    return JSON.parse(data);
};

export const saveExams = (exams) => {
    localStorage.setItem(STORAGE_KEYS.EXAMS, JSON.stringify(exams));
};