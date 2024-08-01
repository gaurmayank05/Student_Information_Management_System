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
    // Optionally fetch all students on init
    // Uncomment if you want to fetch students on component load
    // this.fetchAllStudents();
  }

  fetchAllStudents(): void {
    this.http.get<any[]>(this.apiUrl).pipe(
      tap(data => {
        console.log('Fetched Students:', data);
        this.students = data;
      }),
      catchError(error => {
        console.error('Error fetching students', error);
        return of([]); // Return an empty array on error
      })
    ).subscribe();
  }

  fetchStudent(): void {
    if (this.studentId.trim() === '') {
      alert('Please enter a valid student ID or roll number.');
      return;
    }

    this.http.get<any>(`${this.apiUrl}/${this.studentId}`).pipe(
      tap(student => {
        this.students = [student]; // Display the single student in the table
      }),
      catchError(error => {
        alert('Student not found.');
        console.error('Error fetching student', error);
        return of(null); // Ensure observable completes
      })
    ).subscribe();
  }

  deleteStudent(): void {
    if (this.studentId.trim() === '') {
      alert('Please enter a valid student ID or roll number.');
      return;
    }

    this.http.delete(`${this.apiUrl}/${this.studentId}`).pipe(
      tap(() => {
        // Fetch all students to refresh the list
        this.fetchAllStudents();
        alert('Student deleted successfully.');
      }),
      catchError(error => {
        alert('Error deleting student.');
        console.error('Error deleting student', error);
        return of(null); // Ensure observable completes
      })
    ).subscribe({
      next: () => console.log('Delete operation completed successfully'),
      error: (err) => console.error('Subscription error', err)
    });
  }
}
