package com.eduexam.backend;

import com.eduexam.backend.model.Course;
import com.eduexam.backend.repository.CourseRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(CourseRepository repository) {
		return args -> {
			if (repository.count() == 0) {
				repository.save(new Course("DSA", "Programming", "Master Data Structures and Algorithms", "8 weeks", "$99", "https://via.placeholder.com/300x200?text=DSA"));
				repository.save(new Course("FullStack", "Programming", "Complete Full Stack Development Course", "12 weeks", "$149", "https://via.placeholder.com/300x200?text=FullStack"));
				repository.save(new Course("DBMS", "Database", "Learn Database Management Systems", "6 weeks", "$79", "https://via.placeholder.com/300x200?text=DBMS"));
			}
		};
	}
}
