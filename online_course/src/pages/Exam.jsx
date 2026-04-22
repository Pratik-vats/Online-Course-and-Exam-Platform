import { useState } from "react";
import "../styles/exam.css";
import { useParams, useNavigate } from "react-router-dom";
import { getExams } from "../utils/storage";
import { saveExamResult } from "../utils/api";
import useAuthContext from "../hooks/useAuthContext";

export default function Exam() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuthContext();
    
    // Exams are currently still in localStorage for simplicity, but could be moved to backend
    const exams = getExams();
    const examData = exams.find(e => e.id === parseInt(id));
    const questions = examData ? examData.questions : [];

    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [score, setScore] = useState(0);

    const handleNext = async () => {
        let newScore = score;
        if (selected === questions[current].answer) {
            newScore++;
            setScore(newScore);
        }

        if (current + 1 < questions.length) {
            setCurrent(current + 1);
            setSelected(null);
        } else {
            // Exam finished, save result
            if (user) {
                await saveExamResult(user.email, examData.id, examData.title, newScore, questions.length);
            }
            navigate("/result", { state: { score: newScore, total: questions.length } });
        }
    };

    if (!examData) {
        return <div className="exam-container"><h2>Exam not found!</h2></div>;
    }

    if (questions.length === 0) {
        return <div className="exam-container"><h2>No questions available for this exam.</h2></div>;
    }

    return (
        <div className="exam-container">
            <h2>{examData.title}</h2>
            <h3>{questions[current].question}</h3>

            <div className="options-container">
                {questions[current].options.map((opt, i) => (
                    <label key={i} className={`option-label ${selected === i ? 'selected' : ''}`}>
                        <input
                            type="radio"
                            name="option"
                            checked={selected === i}
                            onChange={() => setSelected(i)}
                        />
                        {opt}
                    </label>
                ))}
            </div>

            <div className="exam-action">
                <button onClick={handleNext} disabled={selected === null} className="btn-primary">
                    {current + 1 === questions.length ? "Finish Exam" : "Next Question"}
                </button>
            </div>
        </div>
    );
}