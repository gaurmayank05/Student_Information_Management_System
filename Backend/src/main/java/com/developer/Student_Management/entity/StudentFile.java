package com.developer.Student_Management.entity;

import jakarta.persistence.*;

@Entity

public class StudentFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String filePath;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private StudentEntity studentEntity;

    public StudentFile() {
    }

    public StudentFile(String filePath, StudentEntity studentEntity) {
        this.filePath = filePath;
        this.studentEntity = studentEntity;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public StudentEntity getStudentEntity() {
        return studentEntity;
    }

    public void setStudentEntity(StudentEntity studentEntity) {
        this.studentEntity = studentEntity;
    }
}