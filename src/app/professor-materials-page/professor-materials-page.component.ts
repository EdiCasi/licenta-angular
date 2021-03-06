import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { MaterialService } from '../material.service';
import { Material } from '../material';
import { HttpErrorResponse } from '@angular/common/http';
import { AddMaterialPopUpComponent } from '../add-material-pop-up/add-material-pop-up.component';
import { AuthService } from '../auth.service';
import { AskForDeletePopUpComponent } from '../ask-for-delete-pop-up/ask-for-delete-pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { SearchGroupForCourseComponent } from '../search-group-for-course/search-group-for-course.component';
import { AssociatedGroupsPopUpComponent } from '../associated-groups-pop-up/associated-groups-pop-up.component';
import { CourseService } from '../course.service';
@Component({
  selector: 'app-professor-materials-page',
  templateUrl: './professor-materials-page.component.html',
  styleUrls: ['./professor-materials-page.component.css'],
})
export class ProfessorMaterialsPageComponent implements OnInit {
  private courseId: any;
  public courseName: any;
  public materials: Material[];
  public isEditingMode: Boolean = false;
  constructor(
    private route: ActivatedRoute,
    private materialService: MaterialService,
    private courseService: CourseService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId');

    this.courseName = this.route.snapshot.paramMap.get('courseName');

    this.getCourseMaterials();
  }

  public getCourseMaterials(): void {
    this.materialService.getCourseMaterials(this.courseId).subscribe(
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
    this.materialService.getMaterial(material.id).subscribe(
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
      height: '180px',
      data: this.courseId,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.materials.push(result);
      }
    });
  }

  public openDeleteMaterialPopUp(selectedMaterial: Material) {
    const dialogRef = this.dialog.open(AskForDeletePopUpComponent, {
      width: '300px',
      height: '200px',
      data: selectedMaterial,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result == true) {
        this.deleteMaterial(selectedMaterial);
      }
    });
  }

  public deleteMaterial(material: Material): void {
    this.materialService.deleteMaterial(material.id).subscribe(
      (response: any) => {
        this.materials = this.materials?.filter(function (value) {
          return value != material;
        });
      },
      (error: HttpErrorResponse) => {
        console.log('==Error deleting material: ' + JSON.stringify(error));
      }
    );
  }

  public openSearchGroupForCoursePopUp() {
    this.dialog.open(SearchGroupForCourseComponent, {
      width: '600px',
      height: '400px',
      data: this.courseId,
    });
  }

  public openAssociatedGroupsPopUp() {
    this.dialog.open(AssociatedGroupsPopUpComponent, {
      width: '500px',
      height: '400px',
      data: this.courseId,
    });
  }

  public openDeleteCoursePopUp() {
    const dialogRef = this.dialog.open(AskForDeletePopUpComponent, {
      width: '300px',
      height: '200px',
      data: { courseToDelete: this.courseName },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result == true) {
        this.deleteCurrentCourse();
      }
    });
  }

  public deleteCurrentCourse(): void {
    this.courseService.deleteCourse(this.courseId).subscribe(
      (response: any) => {
        alert('Cursul' + this.courseName + ' a fost sters cu succes!');
        this.router.navigateByUrl('professorCourses');
      },
      (error: HttpErrorResponse) => {
        console.log('==Error deleting material: ' + JSON.stringify(error));
      }
    );
  }
}
