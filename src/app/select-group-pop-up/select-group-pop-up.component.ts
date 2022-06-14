import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from '../student';
import { StudentGroup } from '../studentGroup';
import { StudentGroupService } from '../student-group.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserToGroupService } from '../user-to-group.service';

const MAX_RECORDS_TO_SHOW = 5;
@Component({
  selector: 'app-select-group-pop-up',
  templateUrl: './select-group-pop-up.component.html',
  styleUrls: ['./select-group-pop-up.component.css'],
})
export class SelectGroupPopUpComponent implements OnInit {
  public studentGroupsFounded: StudentGroup[] = [];
  private previousSearchTextLength = 0;

  constructor(
    private studentGroupService: StudentGroupService,
    private userToGroupService: UserToGroupService,
    public dialogRef: MatDialogRef<SelectGroupPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public student: Student
  ) {}

  ngOnInit(): void {
    this.getStudentGroupsByName('');
  }

  public onInputChange($event: any) {
    if (
      this.studentGroupsFounded.length > MAX_RECORDS_TO_SHOW ||
      $event.target.value == '' ||
      (this.studentGroupsFounded.length < MAX_RECORDS_TO_SHOW &&
        this.previousSearchTextLength > $event.target.value.length)
    ) {
      console.log(' AICI');
      this.getStudentGroupsByName($event.target.value);
    } else {
      this.studentGroupsFounded = this.filterItemInArray(
        $event.target.value,
        this.studentGroupsFounded
      );
      if (
        this.studentGroupsFounded.length == 0 ||
        this.studentGroupsFounded.length < MAX_RECORDS_TO_SHOW
      ) {
        this.getStudentGroupsByName($event.target.value);
      }
    }
    this.previousSearchTextLength = $event.target.value.length;
  }

  public getStudentGroupsByName(groupName: string) {
    this.studentGroupService
      .getStudentGroupByName({ groupName: groupName })
      .subscribe(
        (response: StudentGroup[]) => {
          this.studentGroupsFounded = response;
        },
        (error: HttpErrorResponse) => {
          console.log(
            '==Error getting student groups: ' + JSON.stringify(error)
          );
        }
      );
  }

  public selectGroup(studentGroup: StudentGroup) {
    if (this.student.studentGroupName != '') {
      this.changeStudentGroup(
        { accountId: this.student.id, studentGroupId: studentGroup.id },
        studentGroup.name
      );
    } else {
      this.addStudentGroup(
        { accountId: this.student.id, studentGroupId: studentGroup.id },
        studentGroup.name
      );
    }
  }

  public addStudentGroup(updateJson: any, selectedGroup: string) {
    this.userToGroupService.addUserToGroup(updateJson).subscribe(
      (response: any) => {
        alert(
          'Studentul ' +
            this.student.userName +
            ' a fost adaugat cu succes in grupa ' +
            selectedGroup
        );
        // close dialog
        this.dialogRef.close(selectedGroup);
        console.log('RESPONSE: ' + JSON.stringify(response));
      },
      (error: HttpErrorResponse) => {
        console.log('==Error adding student groups: ' + JSON.stringify(error));
      }
    );
  }

  public changeStudentGroup(updateJson: any, selectedGroup: string) {
    this.userToGroupService.changeStudentGroup(updateJson).subscribe(
      (response: any) => {
        alert(
          'Studentul ' +
            this.student.userName +
            ' a fost repartizat in grupa ' +
            selectedGroup
        );
        // close dialog
        this.dialogRef.close(selectedGroup);
        console.log('RESPONSE: ' + JSON.stringify(response));
      },
      (error: HttpErrorResponse) => {
        console.log('==Error getting student groups: ' + JSON.stringify(error));
      }
    );
  }

  public filterItemInArray(prefix: string, groupsFounded: StudentGroup[]) {
    return groupsFounded.filter((item) => item.name.startsWith(prefix));
  }
}
