package com.developer.Student_Management.mapper;

import com.developer.Student_Management.dto.StudentDto;
import com.developer.Student_Management.entity.Student;

public class StudentMapper {
    public static StudentDto mapToStudentDto(Student student) {
        return new StudentDto(
                student.getId(),
                student.getName(),
                student.getAge(),
                student.getGender(),
                student.getRollNo(),
                student.getCourse(),
                student.getStream(),
                student.getStudentPhoto()
        );
    }

    public static Student mapToStudent(StudentDto studentDto) {
        return new Student(
                studentDto.getId(),
                studentDto.getName(),
                studentDto.getAge(),
                studentDto.getGender(),
                studentDto.getRollNo(),
                studentDto.getCourse(),
                studentDto.getStream(),
                studentDto.getStudentPhoto()
        );
    }
}
