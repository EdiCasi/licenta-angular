import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Account } from '../account';
@Component({
  selector: 'app-delete-professor-pop-up',
  templateUrl: './delete-professor-pop-up.component.html',
  styleUrls: ['./delete-professor-pop-up.component.css'],
})
export class DeleteProfessorPopUpComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteProfessorPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public professor: Account
  ) {}
}
