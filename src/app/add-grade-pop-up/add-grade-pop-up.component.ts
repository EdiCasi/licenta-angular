import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Grade } from '../grade';
import { GradeService } from '../grade.service';
import { DateAdapter } from '@angular/material/core';
@Component({
  selector: 'app-add-grade-pop-up',
  templateUrl: './add-grade-pop-up.component.html',
  styleUrls: ['./add-grade-pop-up.component.css'],
})
export class AddGradePopUpComponent implements OnInit {
  public gradeValue: number;
  public gradeDate: Date;
  public inputErrors: Boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddGradePopUpComponent>,
    private gradeService: GradeService,
    @Inject(MAT_DIALOG_DATA) public objectReceived: any,
    private dateAdapter: DateAdapter<Date>
  ) {
    // for date picker to have the good format
    this.gradeDate = new Date();
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddClick() {
    this.inputErrors = this.validateInput();
    if (!this.inputErrors) {
      this.createNewGradeInDatabase(
        this.objectReceived.studentId,
        this.objectReceived.courseId
      );
    }
  }

  public createNewGradeInDatabase(studentId: number, courseId: number) {
    var grade: Grade = {
      id: 0,
      studentId: studentId,
      courseId: courseId,
      gradeDate: this.gradeDate,
      gradeValue: this.gradeValue,
    };

    this.gradeService.addGrade(grade).subscribe(
      (response: Grade) => {
        alert('Nota a fost adaugata cu succes!');
        this.dialogRef.close();
      },
      (error: HttpErrorResponse) => {
        console.log('==Error add grade: ' + JSON.stringify(error));
      }
    );
  }

  validateInput(): Boolean {
    console.log('this.newGradeValue ' + this.gradeValue);
    console.log('this.newGradeDate ' + this.gradeDate);
    if (this.gradeValue == undefined) {
      alert('Va rugam sa completati toate campurile!');
      return true;
    }
    if (this.gradeValue < 1 || this.gradeValue > 10) {
      alert('Va introduceti o nota valida!');
      return true;
    }
    if (this.gradeDate == undefined) {
      alert('Va rugam sa completati toate campurile!');
      return true;
    }
    return false;
  }

  onInputChange(): void {
    this.inputErrors = false;
  }
}
