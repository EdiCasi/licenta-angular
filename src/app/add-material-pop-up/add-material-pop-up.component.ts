import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { UserToGroupService } from '../user-to-group.service';
import { Account } from '../account';
import { MaterialService } from '../material.service';
@Component({
  selector: 'app-add-material-pop-up',
  templateUrl: './add-material-pop-up.component.html',
  styleUrls: ['./add-material-pop-up.component.css'],
})
export class AddMaterialPopUpComponent {
  constructor(
    public dialogRef: MatDialogRef<AddMaterialPopUpComponent>,
    private materialService: MaterialService,
    @Inject(MAT_DIALOG_DATA) public courseId: number
  ) {}

  onOkClick() {}
}
