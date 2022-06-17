import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AskForDeletePopUpComponent } from '../ask-for-delete-pop-up/ask-for-delete-pop-up.component';
import { EditStudentGroupPopUpComponent } from '../edit-student-group-pop-up/edit-student-group-pop-up.component';
import { StudentGroupService } from '../student-group.service';
import { StudentGroup } from '../studentGroup';

@Component({
  selector: 'app-student-groups',
  templateUrl: './student-groups.component.html',
  styleUrls: ['./student-groups.component.css'],
})
export class StudentGroupsComponent implements OnInit {
  public studentGroups: StudentGroup[] | undefined;
  public dataSource: MatTableDataSource<StudentGroup>;
  displayedColumns = ['index', 'name', 'edit', 'seeStudents', 'delete'];

  constructor(
    private studentGroupService: StudentGroupService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllStudentGroups();
  }
  public getAllStudentGroups(): void {
    this.studentGroupService.getStudentGroups().subscribe(
      (response: StudentGroup[]) => {
        this.studentGroups = response;
        this.dataSource = new MatTableDataSource(this.studentGroups);
      },
      (error: HttpErrorResponse) => {
        console.log('==Error getting student groups: ' + JSON.stringify(error));
      }
    );
  }

  public openeEditStudentGrup(studentGroup: StudentGroup) {
    const dialogRef = this.dialog.open(EditStudentGroupPopUpComponent, {
      width: '400px',
      height: '220px',
      data: studentGroup,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (
        result != undefined &&
        JSON.stringify(studentGroup) !== JSON.stringify(result)
      ) {
        this.modifyStudentGroupInDatabase(result);
        Object.assign(studentGroup, result);
      }
    });
  }

  private modifyStudentGroupInDatabase(studentGroup: StudentGroup) {
    this.studentGroupService.updateStudentGroup(studentGroup).subscribe(
      (response: StudentGroup) => {
        console.log('RESPONSE: ' + JSON.stringify(response));
        alert('Grupa: ' + response.name + ' a fost modificata cu succes!');
      },
      (error: HttpErrorResponse) => {
        console.log(
          '==Error updating student groups: ' + JSON.stringify(error)
        );
      }
    );
  }

  public openeAddStudentGroup() {
    const dialogRef = this.dialog.open(EditStudentGroupPopUpComponent, {
      width: '400px',
      height: '225px',
      data: undefined,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log('==RESULT: ' + JSON.stringify(result));

      if (result != undefined) {
        this.addStudentGrouprInDatabase(result);
      }
    });
  }

  private addStudentGrouprInDatabase(studentGroup: StudentGroup) {
    this.studentGroupService.addStudentGroup(studentGroup).subscribe(
      (response: StudentGroup) => {
        console.log('RESPONSE: ' + JSON.stringify(response));

        const tableData = this.dataSource.data;
        tableData.push(response);
        this.dataSource.data = tableData;

        alert('Grupa: ' + response.name + ' a fost adaugata cu succes!');
      },
      (error: HttpErrorResponse) => {
        console.log('==Error adding group: ' + JSON.stringify(error));
      }
    );
  }

  public openDeleteStudentGroup(studentGroup: StudentGroup) {
    const dialogRef = this.dialog.open(AskForDeletePopUpComponent, {
      width: '300px',
      height: '200px',
      data: studentGroup,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result == true) {
        this.deleteStudentGroupFromDatabase(studentGroup);
      }
    });
  }

  private deleteStudentGroupFromDatabase(studentGroup: StudentGroup) {
    this.studentGroupService.deleteStudentGroup(studentGroup.id).subscribe(
      (response: any) => {
        const tableData = this.dataSource.data.filter(
          (item) => item !== studentGroup
        );
        this.dataSource.data = tableData;

        alert('Grupa: ' + studentGroup.name + ' a fost stersa cu succes!');
      },
      (error: HttpErrorResponse) => {
        console.log('==Error deleting group: ' + JSON.stringify(error));
      }
    );
  }
}
