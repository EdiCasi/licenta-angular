import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { MaterialService } from '../material.service';
import { Material } from '../material';
import { HttpErrorResponse } from '@angular/common/http';
import { AddMaterialPopUpComponent } from '../add-material-pop-up/add-material-pop-up.component';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-professor-materials-page',
  templateUrl: './professor-materials-page.component.html',
  styleUrls: ['./professor-materials-page.component.css'],
})
export class ProfessorMaterialsPageComponent implements OnInit {
  private courseId: any;
  public courseName: any;
  public materials: Material[] | undefined;
  public isEditingMode: Boolean = false;
  constructor(
    private route: ActivatedRoute,
    private materrialService: MaterialService,
    private auth: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId');

    this.courseName = this.route.snapshot.paramMap.get('courseName');

    this.getCourseMaterials();
  }

  public getCourseMaterials(): void {
    this.materrialService.getCourseMaterials(this.courseId).subscribe(
      (response: Material[]) => {
        this.materials = response;
      },
      (error: HttpErrorResponse) => {
        console.log(
          '==Error getting course materials: ' + JSON.stringify(error)
        );
      }
    );
  }

  public downloadMaterial(material: Material): void {
    this.materrialService.getMaterial(material.id).subscribe(
      (response: any) => {
        console.log(' === materialId: ' + material.id);
        console.log(' === response.fileType: ' + response.fileType);
        console.log('RESPONSE: ' + JSON.stringify(response));

        this.downloadFile(response, material.fileType);
      },
      (error: HttpErrorResponse) => {
        console.log('==Error getting material: ' + JSON.stringify(error));
        console.log('==ERROR: ' + error.message);
      }
    );
  }

  downloadFile(data: Blob, fileType: string) {
    const blob = new Blob([data], { type: fileType });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  public onEditClick() {
    this.isEditingMode = !this.isEditingMode;
  }

  public openAddMaterialPopUp() {
    const dialogRef = this.dialog.open(AddMaterialPopUpComponent, {
      width: '400px',
      height: '220px',
      data: this.auth.getLoggedUser().id,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result != undefined) {
        // this.professorCourses.push(result);
      }
    });
  }
}
