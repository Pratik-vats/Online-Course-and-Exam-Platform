import { useState, useEffect } from "react";
import CourseCard from "../components/CourseCard";
import { getCourses, enrollCourse } from "../utils/api";
import useAuthContext from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;

        getCourses().then((data) => {
            if (isMounted) {
                setCourses(data);
                setLoading(false);
            }
        });

        return () => {
            isMounted = false;
        };
    }, []);

    const handleEnroll = async (course) => {
        if (!user) {
            alert("Please login to enroll in a course.");
            navigate("/login");
            return;
        }

        try {
            await enrollCourse(user.email, course.id, course.title);
            alert(`Successfully enrolled in ${course.title}!`);
        } catch (e) {
            alert(e.message || "Could not enroll. You might already be enrolled.");
        }
    };

    return (
        <div className="courses-page">
            <h1>Courses</h1>

            {loading ? (
                <p style={{ textAlign: 'center' }}>Loading courses...</p>
            ) : (
                <div className="courses-container">
                    {courses.map((course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            onEnroll={handleEnroll}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
