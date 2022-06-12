import { Student } from './student';

export class Account {
  id: number;
  userName: string;
  password: string;
  email: string;
  userType: string;

  constructor();
  constructor(userType?: string, student?: Student);

  constructor(userType?: string, student?: Student) {
    this.userType = userType || '';

    this.id = student?.id || 0;
    this.userName = student?.userName || '';
    this.password = student?.password || '';
    this.email = student?.email || '';
  }
}
