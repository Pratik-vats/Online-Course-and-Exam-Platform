import { useState, useEffect, useCallback } from "react";
import { getCourses, createCourse, updateCourse } from "../utils/api";

export default function AdminDashboard() {
    const [courses, setCourses] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({
        title: "",
        category: "",
        description: "",
        duration: "",
        price: "",
        image: ""
    });

    const loadCourses = useCallback(async () => {
        const data = await getCourses();
        setCourses(data);
    }, []);

    useEffect(() => {
        let isMounted = true;

        getCourses().then((data) => {
            if (isMounted) {
                setCourses(data);
            }
        });

        return () => {
            isMounted = false;
        };
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleEditClick = (course) => {
        setIsEditing(true);
        setEditId(course.id);
        setForm({
            title: course.title,
            category: course.category,
            description: course.description,
            duration: course.duration,
            price: course.price,
            image: course.image || ""
        });
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditId(null);
        setForm({ title: "", category: "", description: "", duration: "", price: "", image: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (isEditing) {
            await updateCourse(editId, form);
            alert("Course updated successfully!");
        } else {
            await createCourse(form);
            alert("Course added successfully!");
        }
        
        handleCancelEdit();
        loadCourses();
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2>Admin Dashboard</h2>
                <p>Manage platform courses and content.</p>
            </div>

            <div className="admin-section" style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr 1fr' }}>
                <div className="add-course-form" style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                    <h3>{isEditing ? "Edit Course" : "Add New Course"}</h3>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                        <input name="title" placeholder="Course Title" value={form.title} onChange={handleChange} required />
                        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
                        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
                        <input name="duration" placeholder="Duration (e.g., 8 weeks)" value={form.duration} onChange={handleChange} required />
                        <input name="price" placeholder="Price (e.g., $99)" value={form.price} onChange={handleChange} required />
                        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button type="submit" className="btn-primary" style={{ flex: 1 }}>{isEditing ? "Update Course" : "Add Course"}</button>
                            {isEditing && (
                                <button type="button" className="btn-secondary" onClick={handleCancelEdit}>Cancel</button>
                            )}
                        </div>
                    </form>
                </div>

                <div className="courses-list" style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                    <h3>Existing Courses</h3>
                    <ul style={{ listStyle: 'none', marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {courses.map(course => (
                            <li key={course.id} style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <strong>{course.title}</strong> - {course.category} ({course.price})
                                </div>
                                <button onClick={() => handleEditClick(course)} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Edit</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
