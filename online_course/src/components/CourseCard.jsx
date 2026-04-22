const CourseCard = ({ course, onEnroll = () => {} }) => {
    return (
        <div className="course-card">
            <img src={course.image} alt={course.title} />

            <div className="course-content">
                <span className="badge">{course.category}</span>

                <h3>{course.title}</h3>
                <p>{course.description}</p>
                
                <div className="course-meta">
                    <span>{course.duration}</span>
                    <span className="price">{course.price}</span>
                </div>

                <div className="course-buttons">
                    <button className="details-btn">Details</button>
                    <button className="wishlist-btn">Wishlist</button>
                    <button onClick={() => onEnroll?.(course)} className="btn-primary">Enroll</button>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;