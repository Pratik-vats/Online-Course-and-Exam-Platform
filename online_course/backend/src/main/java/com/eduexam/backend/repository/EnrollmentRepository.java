package com.eduexam.backend.repository;

import com.eduexam.backend.model.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByUserEmail(String userEmail);
    boolean existsByUserEmailAndCourseId(String userEmail, Long courseId);
}
