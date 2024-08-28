package com.developer.Student_Management.service.implementation;

import com.developer.Student_Management.dto.StudentDto;
import com.developer.Student_Management.entity.Student;
import com.developer.Student_Management.mapper.StudentMapper;
import com.developer.Student_Management.repository.StudentRepository;
import com.developer.Student_Management.service.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class StudentServiceImplementation implements StudentService {

    private StudentRepository studentRepository;
    @Override
    public StudentDto createStudent(StudentDto studentDto) {
        Student student = StudentMapper.mapToStudent(studentDto);
        Student savedStudent = studentRepository.save(student);
        return StudentMapper.mapToStudentDto(savedStudent);
    }

    @Override
    public StudentDto getStudentByID(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(null);
        return StudentMapper.mapToStudentDto(student);
    }

    @Override
    public List<StudentDto> getAllStudents() {
        List<Student> students = studentRepository.findAll();
        return students.stream().map((student )-> StudentMapper.mapToStudentDto(student))
                .collect(Collectors.toList());
    }

    @Override
    public StudentDto updateStudent(Long studentId, StudentDto updatedStudent) {
        Student student = studentRepository.findById(studentId).orElseThrow(
                () -> new RuntimeException("Student not exists with id: " + studentId));

        student.setName(updatedStudent.getName());
        student.setAge(updatedStudent.getAge());
        student.setGender(updatedStudent.getGender());
        student.setRollNo(updatedStudent.getRollNo());
        student.setCourse(updatedStudent.getCourse());
        student.setStream(updatedStudent.getStream());
        student.setSemester(updatedStudent.getSemester());
        student.setStudentPhoto(updatedStudent.getStudentPhoto());
        Student updatedStudentData = studentRepository.save(student);
        return StudentMapper.mapToStudentDto(updatedStudentData);
    }

    @Override
    public void deleteStudent(Long studentId) {
        Student student = studentRepository.findById(studentId).orElseThrow(
                () -> new RuntimeException("Student not exists with id: " + studentId)
        );
        studentRepository.deleteById(studentId);
    }
}