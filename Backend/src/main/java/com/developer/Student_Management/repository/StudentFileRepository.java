package com.developer.Student_Management.repository;


import com.developer.Student_Management.entity.StudentFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentFileRepository extends JpaRepository<StudentFile, Long> {
}