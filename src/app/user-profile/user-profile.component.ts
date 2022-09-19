import { Component, OnInit } from '@angular/core';
import { FetchDataApiService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user = {
    name: "",
    email: "",
    birth: ""
  }

  constructor(
    public fetchDataApi: FetchDataApiService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    /**
     * Gets the user from local storage then runf the get request to get necessary user information
     */
    this.fetchDataApi.getUser(localStorage.getItem("user")).subscribe((results) => {
      // cut off the unneeded part of the birthday
      this.user.name = results.Username
      this.user.email = results.Email
      const birthday = results.Birthday.slice(0, 10);
      this.user.birth = birthday
      //assign the user variable
    })
  }

  /**
   * Opens dialog used to edit user information
   */
  openEditUser(): void {
    this.dialog.open(EditUserComponent, {
      width: "500px"
    });
  }

  /**
   * Opens dialog used to delete a user account
   */
  openDeleteUser(): void {
    this.dialog.open(DeleteUserComponent, {
      width: "500px"
    });
  }

}
