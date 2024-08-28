package com.developer.Student_Management.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table (name = "student_detail")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "Name")
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
}