package com.developer.Student_Management.repository;

import com.developer.Student_Management.entity.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;


public interface StudentRepository extends JpaRepository<StudentEntity, Long> {
}
