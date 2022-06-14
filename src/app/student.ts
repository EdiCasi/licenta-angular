import { Account } from './account';

export class Student {
  id: number;
  userName: string;
  password: string;
  email: string;
  userType: string;
  studentGroupName: string;

  constructor();
  constructor(account: Account, studentGroupName?: string);
  constructor(account?: Account, studentGroupName?: string) {
    this.id = account?.id ?? 0;
    this.userName = account?.userName ?? '';
    this.password = account?.password ?? '';
    this.email = account?.email ?? '';
    this.userType = account?.userType ?? '';
    this.studentGroupName = studentGroupName || '';
  }
}
