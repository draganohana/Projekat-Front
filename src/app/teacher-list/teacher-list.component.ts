import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { AuthService } from '../services/auth-service.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Teacher } from '../models/Teacher';
import { TeacherService } from '../teacher.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit, AfterViewInit {

  teachers$: Observable<Teacher[]>;
  private searchTerm = new Subject<string>();

  constructor(private teacherService: TeacherService, private authService: AuthService, private router: Router) { }

  search(term: string) {
    this.searchTerm.next(term);
  }

  ngOnInit() {
    this.teachers$ = this.searchTerm.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term: string) => this.teacherService.searchTeachers(term))
    );
  }
  getTeachers(): void {
    this.teacherService.getTeachers()
        .subscribe(a => this.teachers$ = this.searchTerm.pipe(
          debounceTime(500),
          distinctUntilChanged(),
          switchMap((term: string) => this.teacherService.searchTeachers(term))
        ));
  }

  ngAfterViewInit(): void {
    this.search('');
  }
  delete(id: number) {
    this.teacherService.delete(id).subscribe(
      _ => this.getTeachers()),
      this.router.navigate(['/students']);
  }

}
