import { Component, OnInit } from '@angular/core';
import { FetchDataApiService } from '../fetch-api-data.service';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
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
    localStorage.clear();
    this.snackBar.open("You Have Logged Out!", "OK", {
      duration: 2000
    });
    this.route.navigate(["welcome"])
  }
}
