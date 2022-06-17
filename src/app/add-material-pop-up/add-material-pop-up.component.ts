import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { Material } from '../material';
import { MaterialService } from '../material.service';
@Component({
  selector: 'app-add-material-pop-up',
  templateUrl: './add-material-pop-up.component.html',
  styleUrls: ['./add-material-pop-up.component.css'],
})
export class AddMaterialPopUpComponent {
  public fileUploaded: File;
  constructor(
    public dialogRef: MatDialogRef<AddMaterialPopUpComponent>,
    private materialService: MaterialService,
    @Inject(MAT_DIALOG_DATA) public courseId: number
  ) {}

  onFileUploaded($event: any) {
    this.fileUploaded = $event.target.files[0];
  }
  onOkClick() {
    this.addMaterialInDatabase();
  }
  addMaterialInDatabase() {
    var formData = new FormData();
    formData.append('file', this.fileUploaded);
    formData.append('courseId', '' + this.courseId);

    this.materialService.addMaterial(formData).subscribe(
      (response: Material) => {
        this.dialogRef.close(response);
      },
      (error: HttpErrorResponse) => {
        console.log(
          '==Error getting course materials: ' + JSON.stringify(error)
        );
      }
    );
  }
}
