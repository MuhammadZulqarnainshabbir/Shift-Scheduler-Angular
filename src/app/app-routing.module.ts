import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NurseComponent } from './components/nurse/nurse.component';
import { AppComponent } from './app.component';
import { DoctorComponent } from './components/doctor/doctor.component';

const routes: Routes = [
  {path: 'nurse', component: NurseComponent},
  {path: 'dashboard', component:AppComponent},
  {path:'doctor', component:DoctorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
