package com.eduexam.backend.controller;

import com.eduexam.backend.model.Enrollment;
import com.eduexam.backend.model.ExamResult;
import com.eduexam.backend.repository.EnrollmentRepository;
import com.eduexam.backend.repository.ExamResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private ExamResultRepository examResultRepository;

    @GetMapping("/{email}/enrollments")
    public List<Enrollment> getEnrollments(@PathVariable String email) {
        return enrollmentRepository.findByUserEmail(email);
    }

    @PostMapping("/enrollments")
    public ResponseEntity<?> enroll(@RequestBody Enrollment enrollment) {
        if (enrollmentRepository.existsByUserEmailAndCourseId(enrollment.getUserEmail(), enrollment.getCourseId())) {
            return ResponseEntity.badRequest().body("Already enrolled in this course");
        }
        Enrollment saved = enrollmentRepository.save(enrollment);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{email}/results")
    public List<ExamResult> getResults(@PathVariable String email) {
        return examResultRepository.findByUserEmail(email);
    }

    @PostMapping("/results")
    public ExamResult saveResult(@RequestBody ExamResult result) {
        return examResultRepository.save(result);
    }
}
