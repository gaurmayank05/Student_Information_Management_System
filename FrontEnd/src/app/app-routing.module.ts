import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationformComponent } from './registrationform/registrationform.component';
import { StudentListComponent } from './studentlist/studentlist.component';

const routes: Routes = [
  { path: '', component: RegistrationformComponent },
  { path: 'students', component: StudentListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
