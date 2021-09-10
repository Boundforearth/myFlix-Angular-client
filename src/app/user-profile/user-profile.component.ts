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
    //when opened, grab the users information so the name, email, and password can be displayed on the page
    this.fetchDataApi.getUser(localStorage.getItem("user")).subscribe((results) => {
      console.log(results);
      // cut off the unneeded part of the birthday
      const birthday = results.Birthday.slice(0, 10);
      //assign the user variable
      this.user = {
        name: results.Username,
        email: results.Email,
        birth: birthday,
      }
    })
  }

  //opens the editUser dialog
  openEditUser(): void {
    this.dialog.open(EditUserComponent, {
      width: "500px"
    });
  }
 
  //open the deleteUser dialog
  openDeleteUser(): void {
    this.dialog.open(DeleteUserComponent, {
      width: "500px"
    });
  }

}
