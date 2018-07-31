import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParentService } from '../parent.service';
import { Parent } from '../models/Parent';
import { Location } from '@angular/common';
import { EUserRole } from '../euser-role.enum';

@Component({
  selector: 'app-parent-post',
  templateUrl: './parent-post.component.html',
  styleUrls: ['./parent-post.component.css']
})
export class ParentPostComponent implements OnInit {
  parent: Parent;

  constructor(private router: Router,
    private location: Location,
    private parentService: ParentService) {
    this.parent = new Parent();
  }

  ngOnInit() {
  }

  addParent(firstName: string, lastName: string, username: string, email: string, password: string) {
      this.parent.firstName = firstName;
      this.parent.lastName = lastName;
      this.parent.username = username;
      this.parent.email = email;
      this.parent.password = password;


      this.parentService.addParent(this.parent)
        .subscribe((parent: Parent) => {
          alert('Parent ' + this.parent.username + ' je uspešno dodat!');
          this.router.navigate(['/parents']);
        });
    }

    // goBack() {
    //   this.location.back();
    // }
}

