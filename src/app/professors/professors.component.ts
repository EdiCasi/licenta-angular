import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { DeleteProfessorPopUpComponent } from '../delete-professor-pop-up/delete-professor-pop-up.component';
import { EditProfessorPopUpComponent } from '../edit-professor-pop-up/edit-professor-pop-up.component';

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
    const dialogRef = this.dialog.open(EditProfessorPopUpComponent, {
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
        this.modifyProfessorInDatabase(result);
        Object.assign(professor, result);
      }
    });
  }

  // DELETE
  public openDeleteProfessor(professor: Account) {
    const dialogRef = this.dialog.open(DeleteProfessorPopUpComponent, {
      width: '300px',
      height: '200px',
      data: professor,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result == true) {
        // DELETE PROFESSORS
        this.deleteProfessorFromDatabase(professor);
      }
    });
  }

  private modifyProfessorInDatabase(professor: Account) {
    this.accountService.updateUser(professor).subscribe(
      (response: Account) => {
        console.log('RESPONSE: ' + JSON.stringify(response));
        alert(
          'Profesorul: ' + response.userName + ' a fost modificat cu succes!'
        );
      },
      (error: HttpErrorResponse) => {
        console.log('==Error updating professors: ' + JSON.stringify(error));
      }
    );
  }

  public openeAddProfessor() {
    const dialogRef = this.dialog.open(EditProfessorPopUpComponent, {
      width: '400px',
      height: '400px',
      data: undefined,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log('==RESULT: ' + JSON.stringify(result));

      if (result != undefined) {
        this.addProffesorInDatabase(result);
      }
    });
  }

  private addProffesorInDatabase(professor: Account) {
    this.accountService.addUser(professor).subscribe(
      (response: Account) => {
        console.log('RESPONSE: ' + JSON.stringify(response));

        const tableData = this.dataSource.data;
        tableData.push(response);
        this.dataSource.data = tableData;

        alert(
          'Profesorul: ' + response.userName + ' a fost adaugat cu succes!'
        );
      },
      (error: HttpErrorResponse) => {
        console.log('==Error adding professors: ' + JSON.stringify(error));
      }
    );
  }
  private deleteProfessorFromDatabase(professor: Account) {
    this.accountService.deleteUser(professor.id).subscribe(
      (response: any) => {
        const tableData = this.dataSource.data.filter(
          (item) => item !== professor
        );
        this.dataSource.data = tableData;

        alert('Profesorul: ' + professor.userName + ' a fost sters cu succes!');
      },
      (error: HttpErrorResponse) => {
        console.log('==Error adding professors: ' + JSON.stringify(error));
      }
    );
  }
}
