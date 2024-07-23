package com.developer.Student_Management.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "student_detail")
public class StudentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "std_id")
    private int id;

    @Column(name = "std_name")
    private String name;

    @Column(name = "std_age")
    private int age;

    @Column(name = "std_gender")
    private String gender;

    @Column(name = "std_roll")
    private int rollNumber;

    public StudentEntity() {
    }

    public StudentEntity(String name, int id, int age, String gender, int rollNumber) {
        this.name = name;
        this.id = id;
        this.age = age;
        this.gender = gender;
        this.rollNumber = rollNumber;
    }

    public long getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public int getRollNumber() {
        return rollNumber;
    }

    public void setRollNumber(int rollNumber) {
        this.rollNumber = rollNumber;
    }
}