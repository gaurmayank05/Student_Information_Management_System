import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Custom Validator Function
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
  selector: 'app-registrationform',
  templateUrl: './registrationform.component.html',
  styleUrls: ['./registrationform.component.css']
})
export class RegistrationformComponent implements OnInit {
  registrationForm: FormGroup;
  courses: string[] = ['BSc', 'BA', 'BCom', 'BTech', 'MCA', 'MSc', 'MA', 'Mtech'];
  semesters: string[] = ['1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester', '7th Semester', '8th Semester'];
  streams: string[] = ['Physics', 'Maths', 'Social Science'];
  isStreamVisible = false;
  photoError: string | null = null;
  photoPreview: string | ArrayBuffer | null = null;
  documentNames: string[] = [];
  documentError: string | null = null;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, nameValidator()]],
      age: ['', [Validators.required, Validators.min(1), Validators.max(150)]],
      gender: ['', [Validators.required, genderValidator()]],
      rollNumber: ['', Validators.required],
      course: ['', Validators.required],
      semester: ['', Validators.required],
      stream: [''],
      photo: ['', Validators.required],
      documents: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registrationForm.valid) {
      console.log('Form Submitted', this.registrationForm.value);
      alert('Form Submitted');
      this.registrationForm.reset();
      this.photoPreview = null;
      this.photoError = null;
      this.documentNames = [];
      this.documentError = null;
    } else {
      alert('Please fill in all required fields.');
    }
  }

  onCourseChange(event: Event): void {
    const selectedCourse = (event.target as HTMLSelectElement).value;
    this.isStreamVisible = selectedCourse === 'BSc' || selectedCourse === 'BA' || selectedCourse === 'MA' || selectedCourse === 'MSc';
    if (!this.isStreamVisible) {
      this.registrationForm.get('stream')?.setValue('');
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files ? input.files[0] : null;

    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        this.photoError = 'Only JPG, JPEG, and PNG files are allowed.';
        this.registrationForm.get('photo')?.setValue('');
        this.photoPreview = null;
      } else {
        this.photoError = null;
        this.registrationForm.get('photo')?.setValue(file);

        const reader = new FileReader();
        reader.onload = () => {
          this.photoPreview = reader.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }

  onDocumentsChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files ? Array.from(input.files) : [];
    const allowedTypes = ['application/pdf'];

    this.documentNames = [];
    this.documentError = null;

    files.forEach(file => {
      if (!allowedTypes.includes(file.type)) {
        this.documentError = 'Only PDF files are allowed.';
      } else {
        this.documentNames.push(file.name);
      }
    });

    this.registrationForm.get('documents')?.setValue(files);
  }
}
