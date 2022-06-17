import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-ask-for-delete-pop-up',
  templateUrl: './ask-for-delete-pop-up.component.html',
  styleUrls: ['./ask-for-delete-pop-up.component.css'],
})
export class AskForDeletePopUpComponent implements OnInit {
  public isStudentGroup: Boolean = false;
  public isMaterial: Boolean = false;
  constructor(
    public dialogRef: MatDialogRef<AskForDeletePopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public onjectReceived: any
  ) {}

  ngOnInit(): void {
    this.verifyObjectReceived(this.onjectReceived);
  }

  verifyObjectReceived(object: any) {
    if (object.fileType != undefined) {
      console.log('AICI1== ');
      this.isMaterial = true;
    } else {
      console.log('AICI2== ');
      this.isStudentGroup = true;
    }
  }
}
