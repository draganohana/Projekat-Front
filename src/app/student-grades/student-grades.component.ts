import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Student } from '../models/Student';
import { AuthService } from '../services/auth-service.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';
import { SveOceneUcenika } from '../models/SveOceneUcenika';

@Component({
  selector: 'app-student-grades',
  templateUrl: './student-grades.component.html',
  styleUrls: ['./student-grades.component.css']
})
export class StudentGradesComponent implements OnInit, AfterViewInit {
  sveOcene: SveOceneUcenika[];
  private searchTerm = new Subject<string>();
  constructor(private studentService: StudentService,
    private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.getStudentGrades();
  }

  search(term: string) {
    this.searchTerm.next(term);
  }

  getStudentGrades(): void {
    this.studentService.getStudentGrades(localStorage.getItem('id'))
        .subscribe(a => this.sveOcene = a);

  }
  ngAfterViewInit(): void {
    this.search('');
  }

}
