import { useLocation, useNavigate } from "react-router-dom";
import "../styles/result.css";

export default function Result() {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state) {
        return (
            <div className="result-container">
                <p>No result found</p>
                <button onClick={() => navigate("/exam")}>Go to Exam</button>
            </div>
        );
    }

    const { score, total } = state;
    const percentage = ((score / total) * 100).toFixed(2);
    const isPass = percentage >= 40;

    return (
        <div className="result-container">
            <div className="result-card">
                <h1>Exam Completed</h1>

                <p>You have successfully finished the exam.</p>
                
                <div className="score-display">
                    {score} / {total} ({percentage}%)
                </div>

                <h2 className={isPass ? "pass" : "fail"}>
                    {isPass ? "PASS" : "FAIL"}
                </h2>

                <button onClick={() => navigate("/courses")} className="btn-primary">
                    Return to Courses
                </button>
            </div>
        </div>
    );
}