import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentGroup } from '../studentGroup';
import { StudentGroupService } from '../student-group.service';
import { HttpErrorResponse } from '@angular/common/http';

import { CourseToGroupRelationService } from '../course-to-group-relation.service';
const MAX_RECORDS_TO_SHOW = 5;
@Component({
  selector: 'app-search-group-for-course',
  templateUrl: './search-group-for-course.component.html',
  styleUrls: ['./search-group-for-course.component.css'],
})
export class SearchGroupForCourseComponent implements OnInit {
  public studentGroupsFounded: StudentGroup[] = [];
  private previousSearchTextLength = 0;

  constructor(
    private studentGroupService: StudentGroupService,
    public dialogRef: MatDialogRef<SearchGroupForCourseComponent>,
    private courseToGroupRelationService: CourseToGroupRelationService,
    @Inject(MAT_DIALOG_DATA) public courseId: number
  ) {}

  ngOnInit(): void {
    this.getStudentGroupsByName('');
  }

  public onInputChange($event: any) {
    if (
      this.studentGroupsFounded.length > MAX_RECORDS_TO_SHOW ||
      $event.target.value == '' ||
      (this.studentGroupsFounded.length < MAX_RECORDS_TO_SHOW &&
        this.previousSearchTextLength > $event.target.value.length)
    ) {
      this.getStudentGroupsByName($event.target.value);
    } else {
      this.studentGroupsFounded = this.filterItemInArray(
        $event.target.value,
        this.studentGroupsFounded
      );
      if (
        this.studentGroupsFounded.length == 0 ||
        this.studentGroupsFounded.length < MAX_RECORDS_TO_SHOW
      ) {
        this.getStudentGroupsByName($event.target.value);
      }
    }
    this.previousSearchTextLength = $event.target.value.length;
  }

  public getStudentGroupsByName(groupName: string) {
    this.studentGroupService
      .searchStudentGroupByNameAndNotInCourse(groupName, this.courseId)
      .subscribe(
        (response: StudentGroup[]) => {
          this.studentGroupsFounded = response;
        },
        (error: HttpErrorResponse) => {
          console.log(
            '==Error getting student groups: ' + JSON.stringify(error)
          );
        }
      );
  }

  public selectGroup(studentGroup: StudentGroup) {
    this.addGroupToCourse(studentGroup.id, this.courseId);
  }

  public addGroupToCourse(studentGroupId: number, courseId: number) {
    var courseGroup = { studentGroupId: studentGroupId, courseId: courseId };
    this.courseToGroupRelationService.addCourseToGroup(courseGroup).subscribe(
      (response: any) => {
        alert('Grupa a fost asociata cu succes!');
        this.dialogRef.close();
      },
      (error: HttpErrorResponse) => {
        console.log(' === ERRORR: ' + JSON.stringify(error));
      }
    );
  }

  public filterItemInArray(prefix: string, groupsFounded: StudentGroup[]) {
    return groupsFounded.filter((item) => item.name.startsWith(prefix));
  }
}
