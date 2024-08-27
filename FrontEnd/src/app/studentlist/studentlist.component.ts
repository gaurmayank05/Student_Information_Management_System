import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

// Custom Validators
export function nameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const name = control.value;
    if (name && /[^a-zA-Z\s]/.test(name)) {
      return { 'invalidName': true };
    }
    return null;
  };
}

export function genderValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const gender = control.value;
    if (!gender) {
      return { 'genderRequired': true };
    }
    return null;
  };
}

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css']
})
export class StudentListComponent implements OnInit {
  students: any[] = [];
  studentId: string = '';
  selectedStudent: any = null;
  registrationForm: FormGroup;
  courses: string[] = ['BSc', 'BA', 'BCom', 'BTech', 'MCA', 'MSc', 'MA', 'Mtech'];
  semesters: string[] = ['1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester', '7th Semester', '8th Semester'];
  streams: string[] = ['Physics', 'Maths', 'Social Science'];
  isStreamVisible = false;
  photoPreview: string | ArrayBuffer | null = null;

  private apiUrl = 'http://localhost:8080/api/students';

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, nameValidator()]],
      age: ['', [Validators.required, Validators.min(1), Validators.max(150)]],
      gender: ['', [Validators.required, genderValidator()]],
      rollNo: ['', [Validators.required, Validators.pattern(/^\d+$/)]], // Ensure rollNo is editable
      course: ['', Validators.required],
      semester: ['', Validators.required],
      stream: ['']
    });

    // Watch for changes to the course field
    this.registrationForm.get('course')?.valueChanges.subscribe(course => this.onCourseChange(course));
  }

  ngOnInit(): void {
    // Uncomment this if you want to fetch all students on initialization
    // this.fetchAllStudents();
  }

  fetchAllStudents(): void {
    this.http.get<any[]>(this.apiUrl).pipe(
      tap(data => {
        console.log('Fetched Students:', data);
        this.students = data;
        this.resetForm();
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
        console.log('Fetched Student:', student); // Debugging line
        this.selectedStudent = student;
        this.registrationForm.patchValue(student);
        console.log('Form Values after patch:', this.registrationForm.value); // Debugging line
        this.photoPreview = student.photo;
        this.isStreamVisible = student.course === 'BSc' || student.course === 'BA' || student.course === 'MA' || student.course === 'MSc';
      }),
      catchError(error => {
        alert('Student not found.');
        console.error('Error fetching student', error);
        return of(null); // Ensure observable completes
      })
    ).subscribe();
  }

  selectStudentForUpdate(student: any): void {
    this.selectedStudent = student;
    this.registrationForm.patchValue(student);
    console.log('Form Values after selectStudentForUpdate:', this.registrationForm.value); // Debugging line
    this.photoPreview = student.photo;
    this.isStreamVisible = student.course === 'BSc' || student.course === 'BA' || student.course === 'MA' || student.course === 'MSc';
  }

  updateStudent(): void {
    if (this.registrationForm.valid) {
      const updatedStudent = this.registrationForm.value;
      const studentId = this.selectedStudent.id; // Use selectedStudent's ID for update

      this.http.put(`${this.apiUrl}/${studentId}`, updatedStudent).pipe(
        tap(() => {
          // Fetch all students to refresh the list
          this.fetchAllStudents();
          alert('Student updated successfully.');
          this.resetForm();
        }),
        catchError(error => {
          alert('Error updating student.');
          console.error('Error updating student', error);
          return of(null); // Ensure observable completes
        })
      ).subscribe();
    } else {
      alert('Please fill in all required fields.');
    }
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
    ).subscribe();
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.photoPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onDocumentsChange(event: any): void {
    // Handle additional documents if needed
  }

  onCourseChange(course: string): void {
    this.isStreamVisible = course === 'BSc' || course === 'BA' || course === 'MA' || course === 'MSc';
    if (!this.isStreamVisible) {
      this.registrationForm.get('stream')?.setValue('');
    }
  }

  resetForm(): void {
    this.registrationForm.reset();
    this.photoPreview = null;
    this.selectedStudent = null;
    this.isStreamVisible = false;
  }
}
