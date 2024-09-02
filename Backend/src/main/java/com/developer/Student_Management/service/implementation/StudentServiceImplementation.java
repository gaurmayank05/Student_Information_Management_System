package com.developer.Student_Management.service.implementation;

import com.developer.Student_Management.entity.StudentEntity;
import com.developer.Student_Management.entity.StudentFile;
import com.developer.Student_Management.repository.StudentFileRepository;
import com.developer.Student_Management.repository.StudentRepository;
import com.developer.Student_Management.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Service
public class StudentServiceImplementation implements StudentService{

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private StudentFileRepository studentFileRepository;

    private static final String UPLOADED_FOLDER = "D:\\Student_Information_Management_System\\upload";

    @Override
    public StudentEntity saveStudent(String name, String age, String gender, Long rollNo,
                                     String course, String semester, String studentPhoto,
                                     MultipartFile[] documents) {

        StudentEntity studentEntity = new StudentEntity();
        studentEntity.setName(name);
        studentEntity.setAge(age);
        studentEntity.setGender(gender);
        studentEntity.setRollNo(rollNo);
        studentEntity.setCourse(course);
        studentEntity.setSemester(semester);
        studentEntity.setStudentPhoto(studentPhoto);

        // Save documents
        List<StudentFile> studentFiles = new ArrayList<>();
        for (MultipartFile document : documents) {
            if (!document.isEmpty()) {
                try {
                    byte[] bytes = document.getBytes();
                    Path path = Paths.get(UPLOADED_FOLDER + document.getOriginalFilename());
                    Files.write(path, bytes);
                    StudentFile studentFile = new StudentFile();
                    studentFile.setFilePath(path.toString());
                    studentFile.setStudentEntity(studentEntity);
                    studentFiles.add(studentFile);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        studentEntity.setFiles(studentFiles);

        studentRepository.save(studentEntity);
        studentFileRepository.saveAll(studentFiles);

        return studentEntity;
    }

    @Override
    public List<StudentEntity> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public StudentEntity getStudentById(Long id) {
        return studentRepository.findById(id).orElse(null);
    }
}