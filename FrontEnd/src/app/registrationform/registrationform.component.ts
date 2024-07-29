import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ValidatorFn,AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


export function noNumbersOrSpecialSymbolsValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isValid = /^[A-Za-z\s]*$/.test(control.value);
    return isValid ? null : { 'invalidName': { value: control.value } };
  };
}

@Component({
  selector: 'app-registrationform',
  templateUrl: './registrationform.component.html',
  styleUrls: ['./registrationform.component.css']
})
export class RegistrationformComponent implements OnInit {
  registrationForm: FormGroup;
  courses: string[] = ['BCA','Bsc', 'Btech', 'MCA','Mtech','BA'];
  semesters: string[] = ['Semester 1', 'Semester 2', 'Semester 3','Semester 4','Semester 5','Semester 6','Semester 7','Semester 8'];
  streams: string[] = ['Physics', 'Maths', 'Arts','Social Sciences'];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, noNumbersOrSpecialSymbolsValidator()]],
      age: ['', [Validators.required, Validators.min(1), Validators.max(150)]],
      gender: ['', Validators.required],
      rollNumber: ['', Validators.required],
      course: ['', Validators.required],
      semester: ['', Validators.required],
      stream: ['', Validators.required],
      photo: [''],
      documents: ['']
    });
  }


  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const formData = new FormData();
      Object.keys(this.registrationForm.controls).forEach(key => {
        formData.append(key, this.registrationForm.get(key)?.value);
      });

      this.http.post('http://localhost:8080/api/students', formData).subscribe(response => {
        console.log('Student registered', response);
      });
    }
  }
}
