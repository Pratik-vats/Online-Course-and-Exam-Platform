const API_BASE = "http://localhost:8081/api";

export const getCourses = async () => {
    try {
        const res = await fetch(`${API_BASE}/courses`);
        if (!res.ok) throw new Error("Failed to fetch courses");
        return await res.json();
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const createCourse = async (course) => {
    try {
        const res = await fetch(`${API_BASE}/courses`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(course)
        });
        return await res.json();
    } catch (e) {
        console.error(e);
        return null;
    }
};

export const updateCourse = async (id, course) => {
    try {
        const res = await fetch(`${API_BASE}/courses/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(course)
        });
        return await res.json();
    } catch (e) {
        console.error(e);
        return null;
    }
};

export const enrollCourse = async (userEmail, courseId, courseTitle) => {
    try {
        const res = await fetch(`${API_BASE}/students/enrollments`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userEmail, courseId, courseTitle })
        });
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text);
        }
        return await res.json();
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const getEnrollments = async (userEmail) => {
    try {
        const res = await fetch(`${API_BASE}/students/${userEmail}/enrollments`);
        if (!res.ok) throw new Error("Failed to fetch enrollments");
        return await res.json();
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const saveExamResult = async (userEmail, examId, examTitle, score, total) => {
    try {
        const res = await fetch(`${API_BASE}/students/results`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userEmail, examId, examTitle, score, total })
        });
        return await res.json();
    } catch (e) {
        console.error(e);
        return null;
    }
};

export const getResults = async (userEmail) => {
    try {
        const res = await fetch(`${API_BASE}/students/${userEmail}/results`);
        if (!res.ok) throw new Error("Failed to fetch results");
        return await res.json();
    } catch (e) {
        console.error(e);
        return [];
    }
};