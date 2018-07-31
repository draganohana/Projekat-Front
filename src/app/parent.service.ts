import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { MessageService } from './services/message.service';
import { AuthService } from './services/auth-service.service';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Parent } from './models/Parent';

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  private parentsUrl = environment.apiBaseUrl + '/parents/';


  constructor(private httpClient: HttpClient,
    private messageService: MessageService,
    private authService: AuthService) { }

    addParent(parent: Parent): Observable<Parent> {
      return this.httpClient
        .post<Parent>(this.parentsUrl, parent, {headers: this.authService.getHeaders()})
        .pipe(
          tap(a => this.log(`Dodat roditelj sa id "${a.id}"`)),
          catchError(this.handleError<Parent>('addParent')));
    }
    updateParent(parent: Parent): Observable<Parent> {
      return this.httpClient
        .put<Parent>(this.parentsUrl + parent.id, parent, {headers: this.authService.getHeaders()})
        .pipe(
          tap(a => this.log(`Izmenjen roditelj sa id "${a.id}"`)),
          catchError(this.handleError<Parent>('updateParent')));
    }

    getParent(id: number): Observable<Parent> {
      return this.httpClient
        .get<Parent>(this.parentsUrl + id, {headers: this.authService.getHeaders()})
        .pipe(
          tap(a => this.log(`Učitan parent sa id "${a.id}"`)),
          catchError(this.handleError<Parent>('getParent')));
    }
    getParents(): Observable<Parent[]> {
      return this.httpClient
        .get<Parent[]>(this.parentsUrl, {headers: this.authService.getHeaders()})
        .pipe(
          tap(_ => this.log(`Učitani parenti`)),
          catchError(this.handleError<Parent[]>('getParents', [])));
    }
    delete(id: number): Observable<any> {
      return this.httpClient.delete<any>(this.parentsUrl  + id, {headers: this.authService.getHeaders()})
      .pipe(
        tap(a => this.log(`deleted parent id: ${id}`)),
        catchError(this.handleError<any>('delete')));

    }

    searchParents(term: string): Observable<Parent[]> {
      if (!term.trim()) {
        return this.getParents();
      }
      return this.httpClient
        .get<Parent[]>(`${this.parentsUrl}?naziv=${term}`, {headers: this.authService.getHeaders()})
        .pipe(
          tap(_ => this.log(`Nadjen parent sa nazivom "${term}"`)),
          catchError(this.handleError<Parent[]>('searchParents', []))
      );
    }
    private log(message: string) {
      this.messageService.add('ParentService: ' + message);
    }
    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error);
        this.log(`${operation} failed: ${error.message}`);
        return of(result as T);
      };
    }
}
