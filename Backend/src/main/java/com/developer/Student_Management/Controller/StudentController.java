package com.developer.Student_Management.Controller;

import com.developer.Student_Management.entity.StudentEntity;
import com.developer.Student_Management.service.StudentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/student")
public class StudentController {
    private final StudentService studentService;
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public List<StudentEntity> findAllEmployee(){
        return studentService.findAllStudent();
    }

    @GetMapping("/{std_id}")
    public Optional<StudentEntity> findStudentById(@PathVariable("std_id") int std_id){
        return studentService.findStudentById(std_id);
    }

    @PostMapping
    public StudentEntity saveStudent(@RequestBody StudentEntity student){
        return studentService.saveStudent(student);
    }

    @PutMapping
    public StudentEntity updateStudent(@RequestBody StudentEntity student){
        return studentService.updateStudent(student);
    }

    @DeleteMapping
    public void deleteStudentById(@PathVariable("std_id") int std_id){
        studentService.deleteStudent(std_id);
    }
}
