import { useState, useEffect } from "react";
import { getEnrollments, getResults } from "../utils/api";

export default function StudentDashboard({ user }) {
    const [enrollments, setEnrollments] = useState([]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    const userEmail = user?.email;

    useEffect(() => {
        let isMounted = true;

        Promise.resolve().then(async () => {
            if (!userEmail) {
                if (isMounted) {
                    setLoading(false);
                }
                return;
            }

            const [enrolledData, resultsData] = await Promise.all([
                getEnrollments(userEmail),
                getResults(userEmail)
            ]);

            if (isMounted) {
                setEnrollments(enrolledData);
                setResults(resultsData);
                setLoading(false);
            }
        });

        return () => {
            isMounted = false;
        };
    }, [userEmail]);

    const avgScore = results.length > 0 
        ? Math.round((results.reduce((acc, r) => acc + (r.score / r.total) * 100, 0)) / results.length) 
        : 0;

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2>Welcome back, {user?.name || 'Student'}!</h2>
                <p>Track your progress and manage your courses.</p>
            </div>

            {loading ? (
                <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading your data...</p>
            ) : (
                <>
                    <div className="stats">
                        <div className="stat-card">
                            <span className="value">{enrollments.length}</span>
                            <span className="label">Enrolled Courses</span>
                        </div>
                        <div className="stat-card">
                            <span className="value">{results.length}</span>
                            <span className="label">Completed Exams</span>
                        </div>
                        <div className="stat-card">
                            <span className="value">{avgScore}%</span>
                            <span className="label">Average Score</span>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr 1fr', marginTop: '3rem' }}>
                        <div className="list-section" style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                            <h3>My Courses</h3>
                            {enrollments.length === 0 ? (
                                <p style={{ color: 'var(--text-secondary)' }}>You haven't enrolled in any courses yet.</p>
                            ) : (
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                                    {enrollments.map(en => (
                                        <li key={en.id} style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                                            <strong>{en.courseTitle}</strong>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="list-section" style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                            <h3>My Exam Results</h3>
                            {results.length === 0 ? (
                                <p style={{ color: 'var(--text-secondary)' }}>You haven't completed any exams yet.</p>
                            ) : (
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                                    {results.map(res => (
                                        <li key={res.id} style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                                            <strong>{res.examTitle}</strong>
                                            <div style={{ marginTop: '0.5rem', color: res.score === res.total ? 'var(--success-color)' : 'var(--text-secondary)' }}>
                                                Score: {res.score} / {res.total} ({(res.score / res.total * 100).toFixed(0)}%)
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
