import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
 
@Component({
  selector: 'app-director-component',
  templateUrl: './director-component.component.html',
  styleUrls: ['./director-component.component.scss']
})
export class DirectorComponent implements OnInit {

  constructor(
    /**
     * data from openDirectorDialog() in movie-card.component.ts.
     * MAT_DIALOG_DATA lets the data flow from that file to here for use
     */
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DirectorComponent>
  ) { }

  ngOnInit(): void {
  }

  /**
   *   function to close dialog
   */
  closeDialog(): void {
    this.dialogRef.close();
  }

}
