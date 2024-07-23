package com.developer.Student_Management.service;

import com.developer.Student_Management.entity.StudentEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public interface StudentService {
    List<StudentEntity> findAllStudent();
    Optional findStudentById(int id);
    StudentEntity saveStudent(StudentEntity student);
    StudentEntity updateStudent(StudentEntity student);
    void deleteStudent(int id);
}