package com.developer.Student_Management.implementation;

import com.developer.Student_Management.entity.StudentEntity;
import com.developer.Student_Management.repository.StudentRepository;
import com.developer.Student_Management.service.StudentService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentServiceImplementation implements StudentService {
    final StudentRepository studentRepository;

    public StudentServiceImplementation(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public List<StudentEntity> findAllStudent() {
        return studentRepository.findAll();
    }

    @Override
    public Optional findStudentById(int std_id) {
        return studentRepository.findById((long) std_id);
    }

    @Override
    public StudentEntity saveStudent(StudentEntity student) {
        return (StudentEntity) studentRepository.save(student);
    }

    @Override
    public StudentEntity updateStudent(StudentEntity student) {
        return (StudentEntity) studentRepository.save(student);
    }

    @Override
    public void deleteStudent(int std_id) {
        studentRepository.deleteById((long) std_id);
    }
}