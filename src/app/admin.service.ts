import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './services/message.service';
import { AuthService } from './services/auth-service.service';
import { Admin } from './models/Admin';
import { environment } from '../environments/environment';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private adminsUrl = environment.apiBaseUrl + '/admins/';

  constructor(private httpClient: HttpClient,
    private messageService: MessageService,
    private authService: AuthService) { }


    addAdmin(admin: Admin): Observable<Admin> {
      return this.httpClient
        .post<Admin>(this.adminsUrl, admin, {headers: this.authService.getHeaders()})
        .pipe(
          tap(a => this.log(`Dodat admin sa id "${a.id}"`)),
          catchError(this.handleError<Admin>('addAdmin')));
    }
    updateAdmin(admin: Admin): Observable<Admin> {
      return this.httpClient
        .put<Admin>(this.adminsUrl + admin.id, admin, {headers: this.authService.getHeaders()})
        .pipe(
          tap(a => this.log(`Izmenjen admin sa id "${a.id}"`)),
          catchError(this.handleError<Admin>('updateAdmin')));
    }

    getAdmin(id: number): Observable<Admin> {
      return this.httpClient
        .get<Admin>(this.adminsUrl + id, {headers: this.authService.getHeaders()})
        .pipe(
          tap(a => this.log(`Učitan admin sa id "${a.id}"`)),
          catchError(this.handleError<Admin>('getAdmin')));
    }

    getAdmins(): Observable<Admin[]> {
      return this.httpClient
        .get<Admin[]>(this.adminsUrl, {headers: this.authService.getHeaders()})
        .pipe(
          tap(_ => this.log(`Učitani admini`)),
          catchError(this.handleError<Admin[]>('getAdmins', [])));
    }
    delete(id: number): Observable<any> {
      return this.httpClient.delete<any>(this.adminsUrl  + id, {headers: this.authService.getHeaders()})
      .pipe(
        tap(a => this.log(`deleted admin id: ${id}`)),
        catchError(this.handleError<any>('delete')));

    }

    searchAdmins(term: string): Observable<Admin[]> {
      if (!term.trim()) {
        return this.getAdmins();
      }

      return this.httpClient
        .get<Admin[]>(`${this.adminsUrl}?naziv=${term}`, {headers: this.authService.getHeaders()})
        .pipe(
          tap(_ => this.log(`Nadjen admin sa nazivom "${term}"`)),
          catchError(this.handleError<Admin[]>('searchAdmins', []))
      );
    }

    private log(message: string) {
      this.messageService.add('AdminService: ' + message);
    }

    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error);
        this.log(`${operation} failed: ${error.message}`);
        return of(result as T);
      };
    }
}
