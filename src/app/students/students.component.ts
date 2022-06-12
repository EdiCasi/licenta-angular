import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Account } from '../account';
import { Student } from '../student';
import { AccountService } from '../account.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteAccountPopUpComponent } from '../delete-account-pop-up/delete-account-pop-up.component';
import { EditAccountPopUpComponent } from '../edit-account-pop-up/edit-account-pop-up.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  private studentGroupId: any;
  public studentGroupName: any;
  public dataSource: MatTableDataSource<Student>;
  public displayGroupName: Boolean = false;
  displayedColumns = [
    'index',
    'name',
    'group',
    'edit',
    'changeGroup',
    'delete',
  ];

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.studentGroupId = this.route.snapshot.paramMap.get('studentGroupId');

    this.studentGroupName =
      this.route.snapshot.paramMap.get('studentGroupName');

    console.log('=== aici 1');
    if (this.studentGroupName != null) {
      console.log('=== aici 2');
      this.displayGroupName = true;
    }

    if (this.studentGroupId != null) {
      this.getAllStudentsFromAgroup(this.studentGroupId);
    }
  }

  public getAllStudentsFromAgroup(studentGroupId: number): void {
    this.accountService.getAllStudentsFromAGroup(studentGroupId).subscribe(
      (response: Account[]) => {
        var studentsArray: Student[] = [];

        response.forEach((item) =>
          studentsArray.push(new Student(item, this.studentGroupName))
        );

        this.dataSource = new MatTableDataSource(studentsArray);

        console.log(JSON.stringify(response));
      },
      (error: HttpErrorResponse) => {
        console.log(
          '==Error getting student from this group: ' + JSON.stringify(error)
        );
      }
    );
  }

  public openeEditStudent(student: Student) {
    const dialogRef = this.dialog.open(EditAccountPopUpComponent, {
      width: '400px',
      height: '400px',
      data: new Account('student', student),
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (
        result != undefined &&
        JSON.stringify(student) !== JSON.stringify(result)
      ) {
        Object.assign(student, result);
      }
    });
  }

  public openeAddStudent() {
    const dialogRef = this.dialog.open(EditAccountPopUpComponent, {
      width: '400px',
      height: '400px',
      data: new Account('student'),
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');

      const tableData = this.dataSource.data;
      tableData.push(new Student(result, this.studentGroupName || ''));
      this.dataSource.data = tableData;
    });
  }

  // DELETE
  public openeDeleteStudent(student: Student) {
    const dialogRef = this.dialog.open(DeleteAccountPopUpComponent, {
      width: '300px',
      height: '200px',
      data: new Account('student', student),
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result == true) {
        const tableData = this.dataSource.data.filter(
          (item) => item !== student
        );
        this.dataSource.data = tableData;
      }
    });
  }
}
