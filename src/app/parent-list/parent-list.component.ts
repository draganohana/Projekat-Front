import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ParentService } from '../parent.service';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../services/auth-service.service';
import { Parent } from '../models/Parent';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parent-list',
  templateUrl: './parent-list.component.html',
  styleUrls: ['./parent-list.component.css']
})
export class ParentListComponent implements OnInit,  AfterViewInit {

  parents$: Observable<Parent[]>;
  private searchTerm = new Subject<string>();

  constructor(private parentService: ParentService, private authService: AuthService, private router: Router) { }

  search(term: string) {
    this.searchTerm.next(term);
  }

  ngOnInit() {
    this.parents$ = this.searchTerm.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term: string) => this.parentService.searchParents(term))
    );
  }
  getParents(): void {
    this.parentService.getParents()
        .subscribe(a => this.parents$ = this.searchTerm.pipe(
          debounceTime(500),
          distinctUntilChanged(),
          switchMap((term: string) => this.parentService.searchParents(term))
        ));
  }

  ngAfterViewInit(): void {
    this.search('');
  }
  delete(id: number) {
    this.parentService.delete(id).subscribe(
      _ => this.getParents()),
      this.router.navigate(['/admins']);
  }

}
