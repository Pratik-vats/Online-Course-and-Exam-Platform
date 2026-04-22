package com.eduexam.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    private String category;
    private String description;
    private String duration;
    private String price;
    private String image;

    public Course() {}

    public Course(String title, String category, String description, String duration, String price, String image) {
        this.title = title;
        this.category = category;
        this.description = description;
        this.duration = duration;
        this.price = price;
        this.image = image;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }
    public String getPrice() { return price; }
    public void setPrice(String price) { this.price = price; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
}
