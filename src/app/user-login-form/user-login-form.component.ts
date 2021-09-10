import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";

import { MatDialogRef } from "@angular/material/dialog";
import { FetchDataApiService } from "../fetch-api-data.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})

export class UserLoginFormComponent implements OnInit {


  //Inputs are double bound to the inputs on the user-login html file
  @Input() userData = { Username: "", Password: ""}

  constructor(
    public fetchDataApi: FetchDataApiService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }
 
  ngOnInit(): void {
  }

  userLogin(): void {
    //take the input login data and make a request
    this.fetchDataApi.userLogin(this.userData).subscribe((results) => {
      // close the dialog upon success, set the token and username to local storage, 
      this.dialogRef.close();
      console.log(results);
      localStorage.setItem("user", results.user.Username)
      localStorage.setItem("token", results.token)
      this.snackBar.open("Successfully Logged In!", "OK", {
        duration: 2000
      })
      //navigate to the movies route
       this.router.navigate(["movies"]);
    }, (results) => {
      this.snackBar.open(results, "OK", {
        duration: 2000
      });
    });
  }
}
