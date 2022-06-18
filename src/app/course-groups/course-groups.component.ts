import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { StudentGroup } from '../studentGroup';
import { StudentGroupService } from '../student-group.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-groups',
  templateUrl: './course-groups.component.html',
  styleUrls: ['./course-groups.component.css'],
})
export class CourseGroupsComponent implements OnInit {
  public studentGroups: StudentGroup[];
  public courseId: number;
  public editingEvents: boolean;

  constructor(
    private studentGroupService: StudentGroupService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.editingEvents =
      this.route.snapshot.paramMap.get('editingEvents') == 'true';
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'));

    this.getStudentCourses(this.courseId);
  }

  public getStudentCourses(courseId: number) {
    this.studentGroupService.getStudentGroupByCourseId(courseId).subscribe(
      (response: StudentGroup[]) => {
        this.studentGroups = response;
      },
      (error: HttpErrorResponse) => {
        console.log(
          '==Error getting student courses: ' + JSON.stringify(error)
        );
      }
    );
  }
}
