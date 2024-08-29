import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // Import HttpClient

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
  streams: string[] = ['Physics', 'Maths', 'Chemistry'];
  isStreamVisible = false;
  photoError: string | null = null;
  photoPreview: string | ArrayBuffer | null = null;
  documentNames: string[] = [];
  documentError: string | null = null;

  private apiUrl = 'http://localhost:8080/api/students';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, nameValidator()]],
      age: ['', [Validators.required, Validators.min(1), Validators.max(150)]],
      gender: ['', [Validators.required, genderValidator()]],
      rollNo: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      course: ['', Validators.required],
      semester: [''],
      stream: [''],
      studentPhoto: [''],
      documents: [null]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;  // No need for FormData, since we're sending the Base64 directly

      this.http.post(this.apiUrl, formData).subscribe({
        next: (response) => {
          console.log('Form Submitted', response);
          alert('Form Submitted Successfully');
          this.registrationForm.reset();
          this.photoPreview = null;
          this.photoError = null;
          this.documentNames = [];
          this.documentError = null;
        },
        error: (err) => {
          console.error('Submission Error', err);
          alert('An error occurred while submitting the form.');
        }
      });
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
        this.registrationForm.get('studentPhoto')?.setValue(null);
        this.photoPreview = null;
      } else {
        this.photoError = null;

        // Convert image file to Base64 and store it in the form
        this.convertFileToBase64(file).then(base64 => {
          console.log('Base64 String:', base64);
          this.registrationForm.get('studentPhoto')?.setValue(base64);
        }).catch(err => {
          console.error('Error converting file to Base64:', err);
        });

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

  private convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = () => {
        reject('Error reading file');
      };
      reader.readAsDataURL(file);
    });
  }
}
