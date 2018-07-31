import { Component, OnInit } from '@angular/core';
import { Student } from '../models/Student';
import { Router } from '@angular/router';
import { StudentService } from '../student.service';
import { Location } from '@angular/common';
import { EUserRole } from '../euser-role.enum';

@Component({
  selector: 'app-student-post',
  templateUrl: './student-post.component.html',
  styleUrls: ['./student-post.component.css']
})
export class StudentPostComponent implements OnInit {
   student: Student;
  constructor(
    private router: Router,
    private location: Location,
    private studentService: StudentService) {
    this.student = new Student();
    }

  ngOnInit() {
  }
  addStudent(firstName: string, lastName: string, username: string, email: string, password: string) {
    this.student.firstName = firstName;
    this.student.lastName = lastName;
    this.student.username = username;
    this.student.email = email;
    this.student.password = password;


    this.studentService.addStudent(this.student)
      .subscribe((student: Student) => {
        alert('Student ' + this.student.username + ' je uspešno dodat!');
        this.router.navigate(['/students']);
      });
  }

  // goBack() {
  //   this.location.back();
  // }
}

