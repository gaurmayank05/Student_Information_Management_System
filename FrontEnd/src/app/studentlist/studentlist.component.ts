import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css']
})
export class StudentListComponent implements OnInit {
  students: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getStudents().subscribe(data => {
      this.students = data;
    });
  }

  getStudents() {
    return this.http.get<any[]>('https://your-backend-api-url/students');
  }
}
