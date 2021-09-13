import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material/dialog";
 
@Component({
  selector: 'app-genre-component',
  templateUrl: './genre-component.component.html',
  styleUrls: ['./genre-component.component.scss']
})
export class GenreComponent implements OnInit {

  constructor(
    /**
     * data from openGenreDialog() in movie-card.component.ts.
     *MAT_DIALOG_DATA lets the data flow from that file to here for use
     */
    public dialogRef: MatDialogRef<GenreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  /**
   * Function to close the dialog
   */
  closeDialog(): void {
    this.dialogRef.close();
  }

}
