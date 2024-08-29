package com.developer.Student_Management.mapper;

import com.developer.Student_Management.dto.StudentDto;
import com.developer.Student_Management.entity.StudentEntity;

public class StudentMapper {
    public static StudentDto mapToStudentDto(StudentEntity studentEntity) {
        return new StudentDto(
                studentEntity.getId(),
                studentEntity.getName(),
                studentEntity.getAge(),
                studentEntity.getGender(),
                studentEntity.getRollNo(),
                studentEntity.getCourse(),
                studentEntity.getStream(),
                studentEntity.getSemester(),
                studentEntity.getStudentPhoto()
        );
    }

    public static StudentEntity mapToStudent(StudentDto studentDto) {
        return new StudentEntity(
                studentDto.getId(),
                studentDto.getName(),
                studentDto.getAge(),
                studentDto.getGender(),
                studentDto.getRollNo(),
                studentDto.getCourse(),
                studentDto.getStream(),
                studentDto.getSemester(),
                studentDto.getStudentPhoto()
        );
    }
}
