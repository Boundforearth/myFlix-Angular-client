import { Component, OnInit, Input } from '@angular/core';
import { FetchDataApiService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
 
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  /**
   *  Inputs double bound to edit-user.component.html
   */
  @Input() userData = { Username: "", Password: "", Email: "", Birthday: ""}

  constructor(
    public fetchDataApi: FetchDataApiService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  /**
   * Edits the user information in the database
   */
  editUser(): void {
    //updates the user information in the database
    this.fetchDataApi.editUser(this.userData).subscribe(() => {
      this.dialogRef.close();
      this.snackBar.open("Account Updated!", "OK", {
        duration: 2000
      })
      //resets the user in local storage
      localStorage.removeItem("user");
      localStorage.setItem("user", this.userData.Username)
      //refresh page to reflect changes made
      window.location.reload();
    }, (results) => {
      //something went wrong
      this.snackBar.open(results, "OK", {
        duration: 2000
      })
    })
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
