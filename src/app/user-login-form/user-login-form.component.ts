import { Component, OnInit, Input } from '@angular/core';

import { MatDialogRef } from "@angular/material/dialog";
import { FetchDataApiService } from "../fetch-api-data.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: "", Password: ""}

  constructor(
    public fetchDataApi: FetchDataApiService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  userLogin(): void {
    this.fetchDataApi.userLogin(this.userData).subscribe((results) => {
      this.dialogRef.close;
      console.log(results);
      localStorage.setItem("user", results.user.Username)
      localStorage.setItem("token", results.token)
      this.snackBar.open("Successfully Logged In!", "OK", {
        duration: 2000
      })
    }, (results) => {
      this.snackBar.open(results, "OK", {
        duration: 2000
      });
    });
  }
}
