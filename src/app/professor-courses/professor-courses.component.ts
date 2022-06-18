import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { CourseService } from '../course.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCoursePopUpComponent } from '../add-course-pop-up/add-course-pop-up.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-professor-courses',
  templateUrl: './professor-courses.component.html',
  styleUrls: ['./professor-courses.component.css'],
})
export class ProfessorCoursesComponent implements OnInit {
  public professorCourses: Course[];
  public editingCourses: Boolean;
  public editingEvents: Boolean;
  constructor(
    private courseService: CourseService,
    private auth: AuthService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.editingCourses =
      this.route.snapshot.paramMap.get('editingCourses') == 'true';

    this.editingEvents =
      this.route.snapshot.paramMap.get('editingEvents') == 'true';

    this.getProfessorCourses();
  }

  public getProfessorCourses(): void {
    this.courseService
      .getProfessorCourses(this.auth.getLoggedUser().id)
      .subscribe(
        (response: Course[]) => {
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
