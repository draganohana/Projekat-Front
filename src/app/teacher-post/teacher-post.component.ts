import { Component, OnInit } from '@angular/core';
import { Teacher } from '../models/Teacher';
import { Router } from '@angular/router';
import { StudentService } from '../student.service';
import { Location } from '@angular/common';
import { EUserRole } from '../euser-role.enum';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-teacher-post',
  templateUrl: './teacher-post.component.html',
  styleUrls: ['./teacher-post.component.css']
})
export class TeacherPostComponent implements OnInit {
  teacher: Teacher;
  constructor(private router: Router,
    private location: Location,
    private teacherService: TeacherService) {
      this.teacher = new Teacher();
     }

  ngOnInit() {
  }
  addTeacher(firstName: string, lastName: string, username: string, email: string, password: string) {
    this.teacher.firstName = firstName;
    this.teacher.lastName = lastName;
    this.teacher.username = username;
    this.teacher.email = email;
    this.teacher.password = password;


    this.teacherService.addTeacher(this.teacher)
      .subscribe((teacher: Teacher) => {
        alert('Teacher ' + this.teacher.username + ' je uspešno dodat!');
        this.router.navigate(['/teachers']);
      });
  }

  // goBack() {
  //   this.location.back();
  // }
}

