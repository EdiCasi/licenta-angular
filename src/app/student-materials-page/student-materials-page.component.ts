import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaterialService } from '../material.service';
import { Material } from '../material';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-student-materials-page',
  templateUrl: './student-materials-page.component.html',
  styleUrls: ['./student-materials-page.component.css'],
})
export class StudentMaterialsPageComponent implements OnInit {
  private courseId: any;
  public courseName: any;
  public materials: Material[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private materrialService: MaterialService
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
        console.log('RESPONSE: ' + JSON.stringify(response));
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
}
