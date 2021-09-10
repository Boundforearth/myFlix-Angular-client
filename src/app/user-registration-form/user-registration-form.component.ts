import { Component, OnInit, Input } from '@angular/core';

import { MatDialogRef } from "@angular/material/dialog";
import { FetchDataApiService } from "../fetch-api-data.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  //Input is double bound to the user-registration-form HTML page.
  @Input() userData = { Username: "", Password: "", Email: "", Birthday: ""};

  constructor(
    public fetchApiData: FetchDataApiService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }
 
  //send form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      //logic for successful registration
      this.dialogRef.close(); //close modal on success
      console.log(result)
      this.snackBar.open("Account Creation Successful", "OK", {
        duration: 2000
      });
    }, (result) => {
      // This runs if account creatin was unsuccessful
      this.snackBar.open(result, "OK", {
        duration: 2000
      });
    });
  }
}
