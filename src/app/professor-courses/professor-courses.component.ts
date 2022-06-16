import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { CourseService } from '../course.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCoursePopUpComponent } from '../add-course-pop-up/add-course-pop-up.component';

@Component({
  selector: 'app-professor-courses',
  templateUrl: './professor-courses.component.html',
  styleUrls: ['./professor-courses.component.css'],
})
export class ProfessorCoursesComponent implements OnInit {
  public professorCourses: Course[];
  constructor(
    private courseService: CourseService,
    private auth: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getProfessorCourses();
  }

  public getProfessorCourses(): void {
    this.courseService
      .getProfessorCourses(this.auth.getLoggedUser().id)
      .subscribe(
        (response: Course[]) => {
          console.log(JSON.stringify(response));
          this.professorCourses = response;
        },
        (error: HttpErrorResponse) => {
          console.log(
            '==Error getting student courses: ' + JSON.stringify(error)
          );
        }
      );
  }

  public addCourse(): void {
    this.openAddCoursePopUp();
  }

  public openAddCoursePopUp() {
    const dialogRef = this.dialog.open(AddCoursePopUpComponent, {
      width: '400px',
      height: '220px',
      data: this.auth.getLoggedUser().id,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result != undefined) {
        this.professorCourses.push(result);
      }
    });
  }
}
