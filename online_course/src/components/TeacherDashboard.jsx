import { useState } from "react";
import { getExams, saveExams } from "../utils/storage";

export default function TeacherDashboard() {
    const [exams, setExams] = useState(() => getExams());
    const [examTitle, setExamTitle] = useState("");
    const [questions, setQuestions] = useState([]);
    
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [options, setOptions] = useState(["", "", "", ""]);
    const [correctAnswer, setCorrectAnswer] = useState(0);

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleAddQuestion = (e) => {
        e.preventDefault();
        if (!currentQuestion || options.some(opt => !opt)) {
            alert("Please fill all question fields and options.");
            return;
        }

        const newQuestion = {
            question: currentQuestion,
            options: [...options],
            answer: parseInt(correctAnswer)
        };

        setQuestions([...questions, newQuestion]);
        setCurrentQuestion("");
        setOptions(["", "", "", ""]);
        setCorrectAnswer(0);
    };

    const handleSaveExam = () => {
        if (!examTitle || questions.length === 0) {
            alert("Please provide an exam title and at least one question.");
            return;
        }

        const newExam = {
            id: Date.now(),
            title: examTitle,
            questions: [...questions]
        };

        const updatedExams = [...exams, newExam];
        setExams(updatedExams);
        saveExams(updatedExams);

        setExamTitle("");
        setQuestions([]);
        alert("Exam saved successfully!");
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2>Teacher Dashboard</h2>
                <p>Manage and create exams for students.</p>
            </div>

            <div className="teacher-section" style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr 1fr' }}>
                <div className="add-exam-form" style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                    <h3>Create New Exam</h3>
                    
                    <div style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
                        <input 
                            placeholder="Exam Title" 
                            value={examTitle} 
                            onChange={(e) => setExamTitle(e.target.value)} 
                            style={{ marginBottom: '1rem', fontWeight: 'bold' }}
                        />
                        <div style={{ padding: '1rem', background: 'var(--bg-color)', borderRadius: 'var(--radius-md)' }}>
                            <h4>Questions Added: {questions.length}</h4>
                        </div>
                    </div>

                    <form onSubmit={handleAddQuestion} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem', border: '1px dashed var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                        <h4 style={{ margin: 0 }}>Add a Question</h4>
                        <input 
                            placeholder="Question Text" 
                            value={currentQuestion} 
                            onChange={(e) => setCurrentQuestion(e.target.value)} 
                        />
                        
                        {options.map((opt, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <input 
                                    type="radio" 
                                    name="correctAnswer" 
                                    checked={correctAnswer === i} 
                                    onChange={() => setCorrectAnswer(i)} 
                                    title="Mark as correct answer"
                                    style={{ width: 'auto', marginBottom: 0 }}
                                />
                                <input 
                                    placeholder={`Option ${i + 1}`} 
                                    value={opt} 
                                    onChange={(e) => handleOptionChange(i, e.target.value)} 
                                    style={{ marginBottom: 0 }}
                                />
                            </div>
                        ))}
                        
                        <button type="submit" className="btn-secondary" style={{ marginTop: '0.5rem' }}>Add Question to Exam</button>
                    </form>

                    <button 
                        onClick={handleSaveExam} 
                        className="btn-primary" 
                        style={{ marginTop: '1.5rem', width: '100%' }}
                    >
                        Save Complete Exam
                    </button>
                </div>

                <div className="exams-list" style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                    <h3>Existing Exams</h3>
                    <ul style={{ listStyle: 'none', marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {exams.map(exam => (
                            <li key={exam.id} style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                                <strong>{exam.title}</strong>
                                <br />
                                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                    {exam.questions.length} Questions
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
