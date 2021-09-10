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
    this.fetchDataApi.getUser(localStorage.getItem("user")).subscribe((results) => {
      console.log(results);
      const birthday = results.Birthday.slice(0, 10);
      this.user = {
        name: results.Username,
        email: results.Email,
        birth: birthday,
      }
    })
  }

  openEditUser(): void {
    this.dialog.open(EditUserComponent, {
      width: "500px"
    });
  }

  openDeleteUser(): void {
    this.dialog.open(DeleteUserComponent, {
      width: "500px"
    });
  }

}
