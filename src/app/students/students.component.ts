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
import { UserToGroup } from '../userToGroup';
import { UserToGroupService } from '../user-to-group.service';
import { SelectGroupPopUpComponent } from '../select-group-pop-up/select-group-pop-up.component';

const MAX_RECORDS_TO_SHOW = 15;

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
  public studentsFounded: Student[] = [];
  public previousSearchTextLength: number = 0;
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
    public dialog: MatDialog,
    private userToGroupService: UserToGroupService
  ) {}

  ngOnInit(): void {
    this.studentGroupId = this.route.snapshot.paramMap.get('studentGroupId');

    this.studentGroupName =
      this.route.snapshot.paramMap.get('studentGroupName');

    if (this.ifGroupTab()) {
      this.displayGroupName = true;
    } else {
      this.modifyTableArray('');
    }

    if (this.studentGroupId != null) {
      this.getAllStudentsFromAgroup(this.studentGroupId);
    }
  }
  public ifGroupTab(): Boolean {
    return this.studentGroupName != null;
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
      if (result != undefined) {
        if (this.ifGroupTab()) {
          this.addStudentToGroupInDatabase(result.id, this.studentGroupId);
        } else {
          this.openeChangeGroup(new Student(result));
        }

        const tableData = this.dataSource.data;
        tableData.push(new Student(result));
        this.dataSource.data = tableData;
      }
    });
  }

  private addStudentToGroupInDatabase(accountId: number, groupId: number) {
    var userToGroup: UserToGroup = new UserToGroup();
    userToGroup.accountId = accountId;
    userToGroup.studentGroupId = groupId;

    this.userToGroupService.addUserToGroup(userToGroup).subscribe(
      (response: UserToGroup) => {
        console.log('RESPONSE: ' + JSON.stringify(response));
      },
      (error: HttpErrorResponse) => {
        console.log('==Error adding student: ' + JSON.stringify(error));
      }
    );
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

  public openeChangeGroup(student: Student) {
    const dialogRef = this.dialog.open(SelectGroupPopUpComponent, {
      width: '600px',
      height: '400px',
      data: student,
    });

    dialogRef.afterClosed().subscribe((studentGroupName) => {
      console.log('The dialog was closed');
      if (studentGroupName != null && this.ifGroupTab()) {
        // don't show the student anymore because is not in the group
        if (this.ifGroupTab()) {
          const tableData = this.dataSource.data.filter(
            (item) => item !== student
          );
          this.dataSource.data = tableData;
        } else {
          // update with the student with the new group
          const tableData = this.dataSource.data.map((item) => {
            return item == student
              ? { ...item, studentGroupName: studentGroupName }
              : item;
          });
          this.dataSource.data = tableData;
        }
      }
    });
  }

  public onSearchgBoxChange($event: any) {
    this.modifyTableArray($event.target.value);
  }

  public modifyTableArray(searchText: string) {
    if (
      this.studentsFounded.length > MAX_RECORDS_TO_SHOW ||
      searchText == '' ||
      (this.studentsFounded.length < MAX_RECORDS_TO_SHOW &&
        this.previousSearchTextLength > searchText.length)
    ) {
      console.log(' AICI');
      this.getStudentsByName(searchText);
    } else {
      this.studentsFounded = this.filterItemInArray(
        searchText,
        this.studentsFounded
      );
      this.dataSource = new MatTableDataSource(this.studentsFounded);
      if (
        this.studentsFounded.length == 0 ||
        this.studentsFounded.length < MAX_RECORDS_TO_SHOW
      ) {
        this.getStudentsByName(searchText);
      }
    }
    this.previousSearchTextLength = searchText.length;
  }

  public getStudentsByName(studentName: string) {
    this.accountService
      .getStudentWithGroupByName({ studentName: studentName })
      .subscribe(
        (response: Student[]) => {
          this.studentsFounded = response;
          this.dataSource = new MatTableDataSource(this.studentsFounded);
        },
        (error: HttpErrorResponse) => {
          console.log('==Error getting students: ' + JSON.stringify(error));
        }
      );
  }

  public filterItemInArray(prefix: string, groupsFounded: Student[]) {
    return groupsFounded.filter((item) => item.userName.startsWith(prefix));
  }
}
