import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchDataApiService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {
 
  constructor(
    //allows use of http requests, router, dialog
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    public fetchDataApi: FetchDataApiService,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  //if user chooses to not delete their account, close the dialog
  dontDelete(): void {
    this.dialogRef.close
  }

  // if user decides to delete account, run this to remove account from database
  deleteUser(): void {
    this.fetchDataApi.deleteUser().subscribe(() => {
      //upon success, this code runs to navigate to welcome screen and close the dialog
      this.dialogRef.close()
      localStorage.clear();
      this.router.navigate(["welcome"]);
      this.snackBar.open("Sorry to see you go :(", "OK", {
        duration: 2000
      })
    }, 
      //this code runs upon error, but http request may still succeed.
      (result) => {
        this.snackBar.open(result, "OK", {
          duration: 2000
        })
    })
  }
}
