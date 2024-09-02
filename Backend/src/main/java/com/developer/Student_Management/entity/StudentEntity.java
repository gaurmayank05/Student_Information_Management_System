package com.developer.Student_Management.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table (name = "student_detail")
public class StudentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "age")
    private String age;
    @Column(name = "gender")
    private String gender;
    @Column(name = "rollNo")
    private Long rollNo;
    @Column(name = "course")
    private String course;
    @Column(name = "stream")
    private String stream;
    @Column(name = "semester")
    private String semester;
    @Column(name = "studentPhoto", length = 2000000)
    private String studentPhoto;

    @OneToMany(mappedBy = "studentEntity", cascade = CascadeType.ALL)
    private List<StudentFile> files;

    public StudentEntity() {
    }

    public StudentEntity(String name, String age, String gender, Long rollNo, String course, String semester, String studentPhoto) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.rollNo = rollNo;
        this.course = course;
        this.semester = semester;
        this.studentPhoto = studentPhoto;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Long getRollNo() {
        return rollNo;
    }

    public void setRollNo(Long rollNo) {
        this.rollNo = rollNo;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public String getStream() {
        return stream;
    }

    public void setStream(String stream) {
        this.stream = stream;
    }

    public String getSemester() {
        return semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

    public String getStudentPhoto() {
        return studentPhoto;
    }

    public void setStudentPhoto(String studentPhoto) {
        this.studentPhoto = studentPhoto;
    }

    public List<StudentFile> getFiles() {
        return files;
    }

    public void setFiles(List<StudentFile> files) {
        this.files = files;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}