import { Component, OnInit } from '@angular/core';
import { FetchDataApiService } from '../fetch-api-data.service';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';
 
@Component({
  //use this selector in the HTML to stick the navbar at the top of any page
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: any = localStorage.getItem("user")

  constructor(
    public fetchDataApi: FetchDataApiService,
    public route: Router,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  signOut(): void {
    //navigates to the welcome screen upon signing out
    localStorage.clear();
    this.snackBar.open("You Have Logged Out!", "OK", {
      duration: 2000
    });
    this.route.navigate(["welcome"])
  }
}
