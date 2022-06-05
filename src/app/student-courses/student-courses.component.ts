import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { CourseService } from '../course.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.css'],
})
export class StudentCoursesComponent implements OnInit {
  public studentCourses: Course[] | undefined;

  constructor(
    private courseService: CourseService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.getStudentCourses();
  }

  public getStudentCourses(): void {
    this.courseService
      .getStudentCourses(this.auth.getLoggedUser().id)
      .subscribe(
        (response: Course[]) => {
          this.studentCourses = response;
        },
        (error: HttpErrorResponse) => {
          console.log(
            '==Error getting student courses: ' + JSON.stringify(error)
          );
        }
      );
  }
}
