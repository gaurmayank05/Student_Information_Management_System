import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';


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
    // this.fetchAllStudents(); // Optionally fetch all students on init
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

    this.http.get<any>(`${this.apiUrl}/${this.studentId}`).pipe(tap(student => {
      this.students = [student];}), // Display the single student in the table
     catchError(error => {
      alert('Student not found.');
       console.error('Error fetching student', error);
      return of (null);
    })
    ).subscribe();
  }

  deleteStudent(): void {
    if (this.studentId.trim() === '') {
      alert('Please enter a valid student ID or roll number.');
      return;
    }

    this.http.delete(`${this.apiUrl}/${this.studentId}`).pipe(tap(() => {
      alert('Student deleted successfully.');
      this.fetchAllStudents(); // Refresh the list after deletion
    }),
        catchError(error => {
      alert('Error deleting student.');
      console.error('Error deleting student', error);
      return of(null);
    })
    ).subscribe();
  }
}
