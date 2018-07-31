import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { Admin } from '../models/Admin';
import { Location } from '@angular/common';
import { EUserRole } from '../euser-role.enum';


@Component({
  selector: 'app-admin-post',
  templateUrl: './admin-post.component.html',
  styleUrls: ['./admin-post.component.css']
})
export class AdminPostComponent implements OnInit {
  admin: Admin;

  constructor(private router: Router,
    private location: Location,
    private adminService: AdminService) {
    this.admin = new Admin();
  }

  ngOnInit() {
  }

  addAdmin(firstName: string, lastName: string, username: string, email: string, password: string) {
      this.admin.firstName = firstName;
      this.admin.lastName = lastName;
      this.admin.username = username;
      this.admin.email = email;
      this.admin.password = password;


      this.adminService.addAdmin(this.admin)
        .subscribe((admin: Admin) => {
          alert('Admin ' + this.admin.username + ' je uspešno dodat!');
          this.router.navigate(['/admins']);
        });
    }

    // goBack() {
    //   this.location.back();
    // }
}
