import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AdminListComponent } from '../admin-list/admin-list.component';
import { ParentListComponent } from '../parent-list/parent-list.component';
import { StudentListComponent } from '../student-list/student-list.component';
import { TeacherListComponent } from '../teacher-list/teacher-list.component';
import { AdminPostComponent } from '../admin-post/admin-post.component';
import { ParentPostComponent } from '../parent-post/parent-post.component';
import { StudentPostComponent } from '../student-post/student-post.component';
import { TeacherPostComponent } from '../teacher-post/teacher-post.component';
import { AdminFilterService } from '../services/filters/admin-filter.service';
import { ParentFilterService } from '../services/filters/parent-filter.service';
import { StudentFilterService } from '../services/filters/student-filter.service';
import { TeacherFilterService } from '../services/filters/teacher-filter.service';
import { StudentGradesComponent } from '../student-grades/student-grades.component';
import { DashboardComponent } from '../dashboard/dashboard.component';



const routes: Route[] = [
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'admins', component: AdminListComponent, canActivate : [AdminFilterService]},
  { path: 'parents', component: ParentListComponent, canActivate : [AdminFilterService]},
  { path: 'students', component: StudentListComponent, canActivate : [AdminFilterService]},
  { path: 'teachers', component: TeacherListComponent, canActivate : [AdminFilterService]},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'add', component: AdminPostComponent, canActivate : [AdminFilterService] },
  { path: 'addParent', component: ParentPostComponent, canActivate : [AdminFilterService] },
  { path: 'addStudent', component: StudentPostComponent, canActivate : [AdminFilterService]},
  { path: 'addTeacher', component: TeacherPostComponent, canActivate : [AdminFilterService] },
  { path: 'ocene', component: StudentGradesComponent, canActivate : [StudentFilterService] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
