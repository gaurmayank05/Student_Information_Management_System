package com.developer.Student_Management.service.implementation;

import com.developer.Student_Management.dto.StudentDto;
import com.developer.Student_Management.entity.StudentEntity;
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
        StudentEntity studentEntity = StudentMapper.mapToStudent(studentDto);
        StudentEntity savedStudent = studentRepository.save(studentEntity);
        return StudentMapper.mapToStudentDto(savedStudent);
    }

    @Override
    public StudentDto getStudentByID(Long studentId) {
        StudentEntity student = studentRepository.findById(studentId)
                .orElseThrow(null);
        return StudentMapper.mapToStudentDto(student);
    }

    @Override
    public List<StudentDto> getAllStudents() {
        List<StudentEntity> students = studentRepository.findAll();
        return students.stream().map((student )-> StudentMapper.mapToStudentDto(student))
                .collect(Collectors.toList());
    }

    @Override
    public StudentDto updateStudent(Long studentId, StudentDto updatedStudent) {
        StudentEntity studentEntity = studentRepository.findById(studentId).orElseThrow(
                () -> new RuntimeException("Student not exists with id: " + studentId));

        studentEntity.setName(updatedStudent.getName());
        studentEntity.setAge(updatedStudent.getAge());
        studentEntity.setGender(updatedStudent.getGender());
        studentEntity.setRollNo(updatedStudent.getRollNo());
        studentEntity.setCourse(updatedStudent.getCourse());
        studentEntity.setStream(updatedStudent.getStream());
        studentEntity.setSemester(updatedStudent.getSemester());
        studentEntity.setStudentPhoto(updatedStudent.getStudentPhoto());
        StudentEntity updatedStudentData = studentRepository.save(studentEntity);
        return StudentMapper.mapToStudentDto(updatedStudentData);
    }

    @Override
    public void deleteStudent(Long studentId) {
        // Check if the student exists
        if (!studentRepository.existsById(studentId)) {
            throw new RuntimeException("Student not exists with id: " + studentId);
        }
        // Delete the student
        studentRepository.deleteById(studentId);
    }
}