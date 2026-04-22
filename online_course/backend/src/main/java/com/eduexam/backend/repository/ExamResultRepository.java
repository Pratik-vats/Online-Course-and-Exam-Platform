package com.eduexam.backend.repository;

import com.eduexam.backend.model.ExamResult;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ExamResultRepository extends JpaRepository<ExamResult, Long> {
    List<ExamResult> findByUserEmail(String userEmail);
}
