import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Grade } from '../grade';
import { GradeService } from '../grade.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-student-grades-on-course-pop-up',
  templateUrl: './student-grades-on-course-pop-up.component.html',
  styleUrls: ['./student-grades-on-course-pop-up.component.css'],
})
export class StudentGradesOnCoursePopUpComponent implements OnInit {
  public studentGrades: Grade[] = [];
  public studentName: string;
  public courseId: number;
  public studentId: number;
  public average: string;

  constructor(
    private gradeService: GradeService,
    public dialogRef: MatDialogRef<StudentGradesOnCoursePopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public objReceived: number
  ) {}

  public useReceivedObject(objReceived: any) {
    this.studentName = objReceived.studentName;
    this.courseId = objReceived.courseId;
    this.studentId = objReceived.studentId;
  }

  ngOnInit(): void {
    this.useReceivedObject(this.objReceived);

    this.getStudentGrades(this.courseId, this.studentId);
  }

  doGradesAverage(studentGrades: Grade[]): string {
    console.log('AICI');
    var sum = 0;
    studentGrades.forEach((grade) => (sum += grade.gradeValue));
    console.log('sum: ' + sum);
    return (sum / studentGrades.length).toFixed(2);
  }

  public getStudentGrades(courseId: number, studentId: number) {
    this.gradeService.getStudentGradesForCourse(studentId, courseId).subscribe(
      (response: any) => {
        this.studentGrades = response;
        if (this.studentGrades.length != 0) {
          this.average = this.doGradesAverage(this.studentGrades);
        }
      },
      (error: HttpErrorResponse) => {
        console.log('==ERROR: ' + error.message);
      }
    );
  }

  public onDeleteClick(gradeId: number) {
    this.deleteGrade(gradeId);
  }

  public deleteGrade(gradeId: number) {
    this.gradeService.deleteGrade(gradeId).subscribe(
      (response: any) => {
        alert('Nota a fost stearsa cu success !');
        this.dialogRef.close();
      },
      (error: HttpErrorResponse) => {
        console.log('==ERROR: ' + error.message);
      }
    );
  }
}
