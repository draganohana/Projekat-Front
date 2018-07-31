import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './services/message.service';
import { AuthService } from './services/auth-service.service';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Teacher } from './models/Teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private teachersUrl = environment.apiBaseUrl + '/teachers/';

  constructor(private httpClient: HttpClient,
    private messageService: MessageService,
    private authService: AuthService) { }

    addTeacher(teacher: Teacher): Observable<Teacher> {
      return this.httpClient
        .post<Teacher>(this.teachersUrl, teacher, {headers: this.authService.getHeaders()})
        .pipe(
          tap(a => this.log(`Dodat učitelj sa id "${a.id}"`)),
          catchError(this.handleError<Teacher>('addTeacher')));
    }
    updateTeacher(teacher: Teacher): Observable<Teacher> {
      return this.httpClient
        .put<Teacher>(this.teachersUrl + teacher.id, teacher, {headers: this.authService.getHeaders()})
        .pipe(
          tap(a => this.log(`Izmenjen učitelj sa id "${a.id}"`)),
          catchError(this.handleError<Teacher>('updateTeacher')));
    }

    getTeacher(id: number): Observable<Teacher> {
      return this.httpClient
        .get<Teacher>(this.teachersUrl + id, {headers: this.authService.getHeaders()})
        .pipe(
          tap(a => this.log(`Učitan teacher sa id "${a.id}"`)),
          catchError(this.handleError<Teacher>('getTeacher')));
    }

    getTeachers(): Observable<Teacher[]> {
      return this.httpClient
        .get<Teacher[]>(this.teachersUrl, {headers: this.authService.getHeaders()})
        .pipe(
          tap(_ => this.log(`Učitani teacheri`)),
          catchError(this.handleError<Teacher[]>('getTeachers', [])));
    }
    delete(id: number): Observable<any> {
      return this.httpClient.delete<any>(this.teachersUrl  + id, {headers: this.authService.getHeaders()})
      .pipe(
        tap(a => this.log(`deleted teacher id: ${id}`)),
        catchError(this.handleError<any>('delete')));

    }

    searchTeachers(term: string): Observable<Teacher[]> {
      if (!term.trim()) {
        return this.getTeachers();
      }

      return this.httpClient
        .get<Teacher[]>(`${this.teachersUrl}?naziv=${term}`, {headers: this.authService.getHeaders()})
        .pipe(
          tap(_ => this.log(`Nadjen teacher sa nazivom "${term}"`)),
          catchError(this.handleError<Teacher[]>('searchTeachers', []))
      );
    }

    private log(message: string) {
      this.messageService.add('TeacherService: ' + message);
    }

    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error);
        this.log(`${operation} failed: ${error.message}`);
        return of(result as T);
      };
    }
}
