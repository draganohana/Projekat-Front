import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { AuthService } from '../services/auth-service.service';
import { Subject, Observable } from 'rxjs';
import { Admin } from '../models/Admin';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit, AfterViewInit {

  admins$: Observable<Admin[]>;
  private searchTerm = new Subject<string>();


  constructor(private adminService: AdminService, private authService: AuthService, private router: Router) { }

  search(term: string) {
    this.searchTerm.next(term);
  }

  ngOnInit() {
    this.admins$ = this.searchTerm.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term: string) => this.adminService.searchAdmins(term))
    );
  }
  getAdmins(): void {
    this.adminService.getAdmins()
        .subscribe(a => this.admins$ = this.searchTerm.pipe(
          debounceTime(500),
          distinctUntilChanged(),
          switchMap((term: string) => this.adminService.searchAdmins(term))
        ));
  }

  ngAfterViewInit(): void {
    this.search('');
  }
  delete(id: number) {
    this.adminService.delete(id).subscribe(
      _ => this.getAdmins()),
      this.router.navigate(['/parents']);
  }
}


