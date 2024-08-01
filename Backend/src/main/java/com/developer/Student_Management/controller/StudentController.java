package com.developer.Student_Management.controller;

import com.developer.Student_Management.dto.StudentDto;
import com.developer.Student_Management.service.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.developer.Student_Management.entity.Student;
import com.developer.Student_Management.repository.StudentRepository;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
@RestController
@RequestMapping("/api/students")
public class StudentController {

    private StudentService studentService;

    // For Adding Student
    @PostMapping
    public ResponseEntity<StudentDto> addStudent(@RequestBody StudentDto studentDto) {
        StudentDto savedStudent = studentService.createStudent(studentDto);
        return new ResponseEntity<>(savedStudent, HttpStatus.CREATED);
    }

    // For Retrieving Student

    @GetMapping("{id}")
    public ResponseEntity<StudentDto> getStudentById(@PathVariable("id") Long studentId) {
        StudentDto studentDto = studentService.getStudentByID(studentId);
        return ResponseEntity.ok(studentDto);
    }

    // For Retrieving all Student
    @GetMapping
    public ResponseEntity<List<StudentDto>> getAllStudents() {
        List<StudentDto> student = studentService.getAllStudents();
        return ResponseEntity.ok(student);
    }

    // For updating a Student
    @PutMapping("{id}")
    public ResponseEntity<StudentDto> updateStudent(@PathVariable("id") Long studentId,
                                                    @RequestBody StudentDto updatedStudentDto) {
        StudentDto studentDto = studentService.updateStudent(studentId, updatedStudentDto);
        return ResponseEntity.ok(studentDto);
    }

    // For deleting a Student
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable("id") Long studentId) {
        studentService.deleteStudent(studentId);
        return ResponseEntity.ok("Student deleted successfully");
    }
}
