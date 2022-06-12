import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentGroup } from '../studentGroup';
@Component({
  selector: 'app-delete-student-group-pop-up',
  templateUrl: './delete-student-group-pop-up.component.html',
  styleUrls: ['./delete-student-group-pop-up.component.css'],
})
export class DeleteStudentGroupPopUpComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteStudentGroupPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public studentGroup: StudentGroup
  ) {}
}
