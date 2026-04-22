import { Link } from "react-router-dom";

export default function Home(){
    return(
        <>
            <section className="hero">
                <div className="hero-content">
                    <h1>Learn. Practice. Succeed.</h1>
                    <p>Interactive courses and real-time exams.</p>
                    <Link to="/courses" className="btn-primary large-btn">
                        Explore Courses
                    </Link>
                </div>
            </section>

            <section className="features">
                <h2>Why Choose EduExam ?</h2>

                <div className="feature-container">
                    <div className="feature-box">
                        <h3>Structured Courses</h3>
                        <p>Step-by-step learning modules</p>
                    </div>  

                    <div className="feature-box">
                        <h3>Online Exams</h3>
                        <p>Practice with real-time exams</p>
                    </div>

                    <div className="feature-box">
                        <h3>Performance Tracking</h3>
                        <p>Track progress easily</p>
                    </div>
                </div>
            </section>
        </>
    );
}