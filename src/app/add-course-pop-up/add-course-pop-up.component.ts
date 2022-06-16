import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from '../course';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-add-course-pop-up',
  templateUrl: './add-course-pop-up.component.html',
  styleUrls: ['./add-course-pop-up.component.css'],
})
export class AddCoursePopUpComponent {
  public newCourseName: string;
  public inputErrors: Boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddCoursePopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public professorId: number,
    private courseService: CourseService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick() {
    this.inputErrors = this.validateInput();
    if (!this.inputErrors) {
      this.createNewCourseInDatabase(this.newCourseName);
    }
  }

  public createNewCourseInDatabase(courseName: string) {
    this.courseService
      .addCourse(new Course(courseName, this.professorId))
      .subscribe(
        (response: Course) => {
          console.log('RESPONSE: ' + JSON.stringify(response));

          this.dialogRef.close(response);
          alert(
            'Cursul cu numele: ' +
              response.courseName +
              ' a fost adaugat cu succes!'
          );
        },
        (error: HttpErrorResponse) => {
          console.log('==Error add course: ' + JSON.stringify(error));
        }
      );
  }

  validateInput(): Boolean {
    if (this.newCourseName == '' || this.newCourseName == undefined) {
      alert('Va rugam sa completati toate campurile!');
      return true;
    }
    return false;
  }

  onInputChange($event: any): void {
    this.inputErrors = false;
  }
}
