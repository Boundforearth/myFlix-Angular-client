import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
 
@Component({
  selector: 'app-synopsis-component',
  templateUrl: './synopsis-component.component.html',
  styleUrls: ['./synopsis-component.component.scss']
})
export class SynopsisComponent implements OnInit {

  constructor(
    /**
     * data from openSynopsisDialog() in movie-card.component.ts.
     * MAT_DIALOG_DATA lets the data flow from that file to here for use
     */
    public dialogRef: MatDialogRef<SynopsisComponent>,
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
