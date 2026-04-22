const ExamQuestions = ({ question , selected , onChange }) => {
    return (
        <div>
            <div className="question-box">
                <h3>{question.number}</h3>
                <p>{question.text}</p>
            </div>

            <div className="option-box">
                {question.options.map((opt , index) => (
                    <label key={index}>
                        <input
                            type="radio"
                            name={`question-${question.number}`}
                            value={opt}
                            checked={selected === opt}
                            onChange={() => onChange(opt)}
                        />
                        {opt}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default ExamQuestions;