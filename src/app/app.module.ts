import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { MessageService } from './services/message.service';
import { AdminListComponent } from './admin-list/admin-list.component';
import { MessageListComponent } from './message-list/message-list.component';
import { StudentListComponent } from './student-list/student-list.component';
import { ParentListComponent } from './parent-list/parent-list.component';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { AdminPostComponent } from './admin-post/admin-post.component';
import { AdminService } from './admin.service';
import { ParentPostComponent } from './parent-post/parent-post.component';
import { StudentPostComponent } from './student-post/student-post.component';
import { TeacherPostComponent } from './teacher-post/teacher-post.component';
import { StudentGradesComponent } from './student-grades/student-grades.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminListComponent,
    MessageListComponent,
    StudentListComponent,
    ParentListComponent,
    TeacherListComponent,
    AdminPostComponent,
    ParentPostComponent,
    StudentPostComponent,
    TeacherPostComponent,
    StudentGradesComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [MessageService, AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
