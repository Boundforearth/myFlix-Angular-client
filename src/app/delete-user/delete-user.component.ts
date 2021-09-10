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
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    public fetchDataApi: FetchDataApiService,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  dontDelete(): void {
    this.dialogRef.close
  }

  deleteUser(): void {
    this.fetchDataApi.deleteUser().subscribe(() => {
      this.dialogRef.close()
      localStorage.clear();
      this.router.navigate(["welcome"]);
      this.snackBar.open("Sorry to see you go :(", "OK", {
        duration: 2000
      })
    }, (result) => {
        this.snackBar.open(result, "OK", {
          duration: 2000
        })
    })
  }
}
