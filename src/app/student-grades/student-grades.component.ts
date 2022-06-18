import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { CourseService } from '../course.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { GradeService } from '../grade.service';
import { Grade } from '../grade';

@Component({
  selector: 'app-student-grades',
  templateUrl: './student-grades.component.html',
  styleUrls: ['./student-grades.component.css'],
})
export class StudentGradesComponent implements OnInit {
  public studentCourses: Course[];
  public courseToGrades: Map<Course, Grade[]> = new Map<Course, Grade[]>();
  public courseToAverage: Map<Course, string> = new Map<Course, string>();
  constructor(
    private courseService: CourseService,
    private gradeService: GradeService,
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

  public onCourseClick(course: Course) {
    if (this.courseToGrades.get(course) != undefined) {
      this.courseToGrades.delete(course);
    } else {
      this.loadCourseGrades(this.auth.getLoggedUser().id, course);
    }
  }

  public loadCourseGrades(stundetId: number, course: Course) {
    this.gradeService.getStudentGradesForCourse(stundetId, course.id).subscribe(
      (response: Grade[]) => {
        this.courseToGrades.set(course, response);
        this.doAverage(course, response);
      },
      (error: HttpErrorResponse) => {
        console.log(
          '==Error getting student courses: ' + JSON.stringify(error)
        );
      }
    );
  }

  public doAverage(course: Course, grades: Grade[]) {
    var sum = 0;
    grades.forEach((grade) => {
      sum += grade.gradeValue;
    });
    this.courseToAverage.set(course, (sum / grades.length).toFixed(2));
  }
}
