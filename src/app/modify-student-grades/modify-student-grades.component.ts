import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { AddGradePopUpComponent } from '../add-grade-pop-up/add-grade-pop-up.component';
import { StudentGradesOnCoursePopUpComponent } from '../student-grades-on-course-pop-up/student-grades-on-course-pop-up.component';

@Component({
  selector: 'app-modify-student-grades',
  templateUrl: './modify-student-grades.component.html',
  styleUrls: ['./modify-student-grades.component.css'],
})
export class ModifyStudentGradesComponent implements OnInit {
  public dataSource: MatTableDataSource<Account>;
  public studentGroupId: number;
  public courseId: number;
  public groupName: string;
  displayedColumns = ['index', 'name', 'show', 'add'];
  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.studentGroupId = Number(
      this.route.snapshot.paramMap.get('studentGroupId')
    );
    this.groupName = this.route.snapshot.paramMap.get('groupName') || '';
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'));

    this.getAllStudentsFromAgroup(this.studentGroupId);
  }

  public getAllStudentsFromAgroup(studentGroupId: number): void {
    this.accountService.getAllStudentsFromAGroup(studentGroupId).subscribe(
      (response: Account[]) => {
        this.dataSource = new MatTableDataSource(response);
      },
      (error: HttpErrorResponse) => {
        console.log(
          '==Error getting student from this group: ' + JSON.stringify(error)
        );
      }
    );
  }

  public openAddGradePopUp(studentId: number) {
    var grade = { studentId: studentId, courseId: this.courseId };
    this.dialog.open(AddGradePopUpComponent, {
      width: '400px',
      height: '300px',
      data: grade,
    });
  }

  public openStudentGradesOnCoursePopUp(student: Account) {
    var obj = {
      studentId: student.id,
      courseId: this.courseId,
      studentName: student.userName,
    };
    this.dialog.open(StudentGradesOnCoursePopUpComponent, {
      width: '500px',
      height: '400px',
      data: obj,
    });
  }
}
