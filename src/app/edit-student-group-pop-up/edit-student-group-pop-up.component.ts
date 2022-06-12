import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentGroup } from '../studentGroup';

@Component({
  selector: 'app-edit-student-group-pop-up',
  templateUrl: './edit-student-group-pop-up.component.html',
  styleUrls: ['./edit-student-group-pop-up.component.css'],
})
export class EditStudentGroupPopUpComponent {
  public inputErrors: Boolean = false;
  public groupeToModify: StudentGroup = new StudentGroup();

  constructor(
    public dialogRef: MatDialogRef<EditStudentGroupPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public studentGroup: StudentGroup
  ) {
    if (studentGroup != undefined) {
      Object.assign(this.groupeToModify, this.studentGroup);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick() {
    this.inputErrors = this.validateInput();
    if (!this.inputErrors) {
      this.dialogRef.close(this.groupeToModify);
    }
  }

  validateInput(): Boolean {
    if (
      this.groupeToModify.name == '' ||
      this.groupeToModify.name == undefined
    ) {
      alert('Va rugam sa completati toate campurile!');
      return true;
    }
    return false;
  }

  onInputChange($event: any): void {
    this.inputErrors = false;
  }
}
