package com.developer.Student_Management.service;

import com.developer.Student_Management.dto.StudentDto;

import java.util.List;

public interface StudentService {
    StudentDto createStudent(StudentDto studentDto);

    StudentDto getStudentByID(Long id);

    List<StudentDto> getAllStudents();

    StudentDto updateStudent(Long studentId, StudentDto updatedStudent);

    void deleteStudent(Long studentId);
}
