import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css']
})
export class StudentListComponent implements OnInit {
  students: any[] = [];
  studentId: string = '';

  private apiUrl = 'http://localhost:8080/api/students';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAllStudents(); // Optionally fetch all students on init
  }

  fetchAllStudents(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(data => {
      this.students = data;
    });
  }

  fetchStudent(): void {
    if (this.studentId.trim() === '') {
      alert('Please enter a valid student ID or roll number.');
      return;
    }

    this.http.get<any>(`${this.apiUrl}/${this.studentId}`).subscribe(data => {
      this.students = [data]; // Display the single student in the table
    }, error => {
      alert('Student not found.');
    });
  }

  deleteStudent(): void {
    if (this.studentId.trim() === '') {
      alert('Please enter a valid student ID or roll number.');
      return;
    }

    this.http.delete(`${this.apiUrl}/${this.studentId}`).subscribe(() => {
      alert('Student deleted successfully.');
      this.fetchAllStudents(); // Refresh the list after deletion
    }, error => {
      alert('Error deleting student.');
    });
  }
}
