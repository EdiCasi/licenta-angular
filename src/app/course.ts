export class Course {
  id: number;
  courseName: string;
  professorId: number;

  constructor();
  constructor(courseName: string, professorId: number);
  constructor(courseName?: string, professorId?: number) {
    this.courseName = courseName || '';
    this.professorId = professorId || 0;
  }
}
