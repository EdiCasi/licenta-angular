import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentGroup } from '../studentGroup';
import { StudentGroupService } from '../student-group.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CourseToGroupRelationService } from '../course-to-group-relation.service';

@Component({
  selector: 'app-associated-groups-pop-up',
  templateUrl: './associated-groups-pop-up.component.html',
  styleUrls: ['./associated-groups-pop-up.component.css'],
})
export class AssociatedGroupsPopUpComponent implements OnInit {
  public studentGroups: StudentGroup[] = [];
  constructor(
    private studentGroupService: StudentGroupService,
    private courseToGroupRelationService: CourseToGroupRelationService,
    public dialogRef: MatDialogRef<AssociatedGroupsPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public courseId: number
  ) {}

  ngOnInit(): void {
    this.getAssociatedGroups(this.courseId);
  }

  public getAssociatedGroups(courseId: number) {
    this.studentGroupService.getStudentGroupByCourseId(courseId).subscribe(
      (response: any) => {
        this.studentGroups = response;
      },
      (error: HttpErrorResponse) => {
        console.log('==ERROR: ' + error.message);
      }
    );
  }

  public onDeleteClick(studentGroup: StudentGroup) {
    this.deleteAssociatedGroups(this.courseId, studentGroup.id);
  }
  public deleteAssociatedGroups(courseId: number, groupId: number) {
    this.courseToGroupRelationService
      .deleteCourseToGroup(courseId, groupId)
      .subscribe(
        (response: any) => {
          alert('Grupa nu mai este asociata la curs !');
          this.dialogRef.close();
        },
        (error: HttpErrorResponse) => {
          console.log('==ERROR: ' + error.message);
        }
      );
  }
}
