import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Student } from '../models/Student';
import { AuthService } from '../services/auth-service.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit, AfterViewInit {
  students$: Observable<Student[]>;
  private searchTerm = new Subject<string>();

  constructor(private studentService: StudentService,
    private authService: AuthService, private router: Router) { }

  search(term: string) {
    this.searchTerm.next(term);
  }
  ngOnInit() {
    this.students$ = this.searchTerm.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term: string) => this.studentService.searchStudents(term))
    );
  }
  getStudents(): void {
    this.studentService.getStudents()
        .subscribe(a => this.students$ = this.searchTerm.pipe(
          debounceTime(500),
          distinctUntilChanged(),
          switchMap((term: string) => this.studentService.searchStudents(term))
        ));
  }

  ngAfterViewInit(): void {
    this.search('');
  }
  delete(id: number) {
    this.studentService.delete(id).subscribe(
      _ => this.getStudents()),
      this.router.navigate(['/teachers']);
  }

}
