package com.developer.Student_Management.service;

import com.developer.Student_Management.entity.StudentEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface StudentService {
    StudentEntity saveStudent(String name, String age, String gender, Long rollNumber,
                              String course, String semester, String photo,
                              MultipartFile[] documents);

    List<StudentEntity> getAllStudents();

    StudentEntity getStudentById(Long id);
}