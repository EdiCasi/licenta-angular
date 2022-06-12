import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { DeleteAccountPopUpComponent } from '../delete-account-pop-up/delete-account-pop-up.component';
import { EditAccountPopUpComponent } from '../edit-account-pop-up/edit-account-pop-up.component';

@Component({
  selector: 'app-professors',
  templateUrl: './professors.component.html',
  styleUrls: ['./professors.component.css'],
})
export class ProfessorsComponent implements OnInit {
  public professors: Account[] | undefined;
  public dataSource: MatTableDataSource<Account>;
  displayedColumns = ['index', 'name', 'edit', 'delete'];

  constructor(
    private accountService: AccountService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllProfessors();
  }

  public getAllProfessors(): void {
    this.accountService.getAllProfessors().subscribe(
      (response: Account[]) => {
        this.professors = response;
        this.dataSource = new MatTableDataSource(this.professors);
      },
      (error: HttpErrorResponse) => {
        console.log('==Error getting professors: ' + JSON.stringify(error));
      }
    );
  }

  public openeEditProfessor(professor: Account) {
    const dialogRef = this.dialog.open(EditAccountPopUpComponent, {
      width: '400px',
      height: '400px',
      data: professor,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (
        result != undefined &&
        JSON.stringify(professor) !== JSON.stringify(result)
      ) {
        Object.assign(professor, result);
      }
    });
  }

  public openeAddProfessor() {
    const dialogRef = this.dialog.open(EditAccountPopUpComponent, {
      width: '400px',
      height: '400px',
      data: new Account('professor'),
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');

      const tableData = this.dataSource.data;
      tableData.push(result);
      this.dataSource.data = tableData;
    });
  }

  // DELETE
  public openDeleteProfessor(professor: Account) {
    const dialogRef = this.dialog.open(DeleteAccountPopUpComponent, {
      width: '300px',
      height: '200px',
      data: professor,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result == true) {
        const tableData = this.dataSource.data.filter(
          (item) => item !== professor
        );
        this.dataSource.data = tableData;
      }
    });
  }
}
