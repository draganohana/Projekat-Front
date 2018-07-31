import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './services/message.service';
import { AuthService } from './services/auth-service.service';
import { Observable, of } from 'rxjs';
import { Student } from './models/Student';
import { tap, catchError } from 'rxjs/operators';
import { SveOceneUcenika } from './models/SveOceneUcenika';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentsUrl = environment.apiBaseUrl + '/students/';

  constructor(private httpClient: HttpClient,
    private messageService: MessageService,
    private authService: AuthService) { }

    addStudent(student: Student): Observable<Student> {
      return this.httpClient
        .post<Student>(this.studentsUrl, student, {headers: this.authService.getHeaders()})
        .pipe(
          tap(a => this.log(`Dodat učenik sa id "${a.id}"`)),
          catchError(this.handleError<Student>('addStudent')));
    }
    updateStudent(student: Student): Observable<Student> {
      return this.httpClient
        .put<Student>(this.studentsUrl + student.id, student, {headers: this.authService.getHeaders()})
        .pipe(
          tap(a => this.log(`Izmenjen učenik sa id "${a.id}"`)),
          catchError(this.handleError<Student>('updateStudent')));
    }

    getStudent(id: number): Observable<Student> {
      return this.httpClient
      .get<Student>(this.studentsUrl + id, {headers: this.authService.getHeaders()})
        .pipe(
          tap(a => this.log(`Učitan student sa id "${a.id}"`)),
          catchError(this.handleError<Student>('getStudent')));
    }

    getStudents(): Observable<Student[]> {
      return this.httpClient
        .get<Student[]>(this.studentsUrl, {headers: this.authService.getHeaders()})
        .pipe(
          tap(_ => this.log(`Učitani studenti`)),
          catchError(this.handleError<Student[]>('getStudents', [])));
    }
    delete(id: number): Observable<any> {
      return this.httpClient.delete<any>(this.studentsUrl  + id, {headers: this.authService.getHeaders()})
      .pipe(
        tap(a => this.log(`deleted student id: ${id}`)),
        catchError(this.handleError<any>('delete')));

    }

    searchStudents(term: string): Observable<Student[]> {
      if (!term.trim()) {
        return this.getStudents();
      }

      return this.httpClient
        .get<Student[]>(`${this.studentsUrl}?naziv=${term}`, {headers: this.authService.getHeaders()})
        .pipe(
          tap(_ => this.log(`Nadjen student sa nazivom "${term}"`)),
          catchError(this.handleError<Student[]>('searchStudents', []))
      );
    }

    private log(message: string) {
      this.messageService.add('StudentService: ' + message);
    }

    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error);
        this.log(`${operation} failed: ${error.message}`);
        return of(result as T);
      };
    }

    getStudentGrades(id: string): Observable<SveOceneUcenika[]> {
      return this.httpClient
        .get<SveOceneUcenika[]>(this.studentsUrl + 'student/' + id, {headers: this.authService.getHeaders()})
        .pipe(
          tap(_ => this.log(`Učitani studenti`)),
          catchError(this.handleError<SveOceneUcenika[]>('getStudents', [])));
    }
}
