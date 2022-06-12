import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from '../account.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Account } from '../account';

@Component({
  selector: 'app-delete-account-pop-up',
  templateUrl: './delete-account-pop-up.component.html',
  styleUrls: ['./delete-account-pop-up.component.css'],
})
export class DeleteAccountPopUpComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteAccountPopUpComponent>,
    private accountService: AccountService,
    @Inject(MAT_DIALOG_DATA) public account: Account
  ) {}

  public onDeleteClick() {
    this.deleteProfessorFromDatabase(this.account);
    this.dialogRef.close(true);
  }

  private deleteProfessorFromDatabase(account: Account) {
    this.accountService.deleteUser(account.id).subscribe(
      (response: any) => {
        alert('Userul: ' + account.userName + ' a fost sters cu succes!');
      },
      (error: HttpErrorResponse) => {
        console.log('==Error deleting professors: ' + JSON.stringify(error));
      }
    );
  }
}
