import { useState } from "react";
import { Link } from "react-router-dom";
import { getExams } from "../utils/storage";

export default function ExamList() {
    const [exams] = useState(() => getExams());

    return (
        <div className="courses-page">
            <h1>Available Exams</h1>
            
            {exams.length === 0 ? (
                <p style={{ textAlign: 'center' }}>No exams available right now.</p>
            ) : (
                <div className="courses-container">
                    {exams.map((exam) => (
                        <div key={exam.id} className="course-card" style={{ padding: '2rem', textAlign: 'center' }}>
                            <h3 style={{ marginBottom: '1rem' }}>{exam.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                Questions: {exam.questions ? exam.questions.length : 0}
                            </p>
                            <Link to={`/exam/${exam.id}`} className="btn-primary" style={{ width: '100%' }}>
                                Start Exam
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
