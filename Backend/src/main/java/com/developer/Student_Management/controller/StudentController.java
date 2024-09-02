package com.developer.Student_Management.controller;

import com.developer.Student_Management.entity.*;
import com.developer.Student_Management.service.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

// Removed @CrossOrigin annotation
@AllArgsConstructor
@RestController
@RequestMapping("/api/students")
@CrossOrigin("http://localhost:4200/")

public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping
    public StudentEntity registerStudent(@RequestParam("name") String name,
                                   @RequestParam("age") String age,
                                   @RequestParam("gender") String gender,
                                   @RequestParam("rollNo") Long rollNo,
                                   @RequestParam("course") String course,
                                   @RequestParam("semester") String semester,
                                   @RequestParam("studentPhoto") String studentPhoto,
                                   @RequestParam("documents") MultipartFile[] documents) {
        System.out.println("Received name: " + name);
        System.out.println("Received age: " + age);
        System.out.println("Received gender: " + gender);
        System.out.println("Received rollNumber: " + rollNo);
        System.out.println("Received course: " + course);
        System.out.println("Received semester: " + semester);
        //System.out.println("Received photo: " + photo.getOriginalFilename());
        for (MultipartFile document : documents) {
            System.out.println("Received document: " + document.getOriginalFilename());
        }
        return studentService.saveStudent(name, age, gender, rollNo, course, semester, studentPhoto, documents);
    }

    @GetMapping
    public List<StudentEntity> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/{id}")
    public StudentEntity getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }
}