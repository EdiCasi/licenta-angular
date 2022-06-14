import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from '../account.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserToGroupService } from '../user-to-group.service';
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
    private userToGroupService: UserToGroupService,
    @Inject(MAT_DIALOG_DATA) public account: Account
  ) {}

  public onDeleteClick() {
    if (this.account.userType == 'student') {
      this.deleteUserToGroupFromDatabase(this.account.id);
    } else {
      this.deleteAccountFromDatabase(this.account);
    }
    this.dialogRef.close(true);
  }
  // first we need to delete the relationship between student and group otherwise
  // foreign key exception will be thrown in spring project
  private deleteUserToGroupFromDatabase(accountId: number) {
    this.userToGroupService.deleteStudentByAccountId(accountId).subscribe(
      (response: any) => {
        console.log('The relatioship wa deleted succesfully!');
        this.deleteAccountFromDatabase(this.account);
      },
      (error: HttpErrorResponse) => {
        console.log('==Error deleting relationship: ' + JSON.stringify(error));
      }
    );
  }

  private deleteAccountFromDatabase(account: Account) {
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
