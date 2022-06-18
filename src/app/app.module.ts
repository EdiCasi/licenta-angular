import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AccountService } from './account.service';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { HomePageComponent } from './home-page/home-page.component';
import { StudentCoursesComponent } from './student-courses/student-courses.component';
import { StudentGradesComponent } from './student-grades/student-grades.component';
import { StudentCalendarComponent } from './student-calendar/student-calendar.component';
import { CourseService } from './course.service';
import { StudentMaterialsPageComponent } from './student-materials-page/student-materials-page.component';
import { ProfessorsComponent } from './professors/professors.component';
import { EditAccountPopUpComponent } from './edit-account-pop-up/edit-account-pop-up.component';
import { DeleteAccountPopUpComponent } from './delete-account-pop-up/delete-account-pop-up.component';
import { StudentGroupsComponent } from './student-groups/student-groups.component';
import { EditStudentGroupPopUpComponent } from './edit-student-group-pop-up/edit-student-group-pop-up.component';
import { AskForDeletePopUpComponent } from './ask-for-delete-pop-up/ask-for-delete-pop-up.component';
import { StudentsComponent } from './students/students.component';
import { SelectGroupPopUpComponent } from './select-group-pop-up/select-group-pop-up.component';
import { ProfessorCoursesComponent } from './professor-courses/professor-courses.component';
import { AddCoursePopUpComponent } from './add-course-pop-up/add-course-pop-up.component';
import { ProfessorMaterialsPageComponent } from './professor-materials-page/professor-materials-page.component';
import { AddMaterialPopUpComponent } from './add-material-pop-up/add-material-pop-up.component';
import { SearchGroupForCourseComponent } from './search-group-for-course/search-group-for-course.component';
import { AssociatedGroupsPopUpComponent } from './associated-groups-pop-up/associated-groups-pop-up.component';
import { CourseGroupsComponent } from './course-groups/course-groups.component';
import { ModifyStudentGradesComponent } from './modify-student-grades/modify-student-grades.component';
import { AddGradePopUpComponent } from './add-grade-pop-up/add-grade-pop-up.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { StudentGradesOnCoursePopUpComponent } from './student-grades-on-course-pop-up/student-grades-on-course-pop-up.component';
import { EditingEventsComponent } from './editing-events/editing-events.component';
import { AddEventPopUpComponent } from './add-event-pop-up/add-event-pop-up.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    HomePageComponent,
    StudentCoursesComponent,
    StudentGradesComponent,
    StudentCalendarComponent,
    StudentMaterialsPageComponent,
    ProfessorsComponent,
    EditAccountPopUpComponent,
    DeleteAccountPopUpComponent,
    StudentGroupsComponent,
    EditStudentGroupPopUpComponent,
    AskForDeletePopUpComponent,
    StudentsComponent,
    SelectGroupPopUpComponent,
    ProfessorCoursesComponent,
    AddCoursePopUpComponent,
    ProfessorMaterialsPageComponent,
    AddMaterialPopUpComponent,
    SearchGroupForCourseComponent,
    AssociatedGroupsPopUpComponent,
    CourseGroupsComponent,
    ModifyStudentGradesComponent,
    AddGradePopUpComponent,
    StudentGradesOnCoursePopUpComponent,
    EditingEventsComponent,
    AddEventPopUpComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'home', component: HomePageComponent },
      { path: 'studentsCalendar', component: StudentCalendarComponent },
      { path: 'grades', component: StudentGradesComponent },
      {
        path: 'professorCourseMaterials',
        component: ProfessorMaterialsPageComponent,
      },
      { path: 'studentCourses', component: StudentCoursesComponent },
      {
        path: 'studentMaterialsPage',
        component: StudentMaterialsPageComponent,
      },
      { path: 'professors', component: ProfessorsComponent },
      { path: 'studentGroups', component: StudentGroupsComponent },
      { path: 'students', component: StudentsComponent },
      { path: 'professorCourses', component: ProfessorCoursesComponent },
      { path: 'courseGroups', component: CourseGroupsComponent },
      { path: 'modifyGrades', component: ModifyStudentGradesComponent },
      { path: 'editingEvents', component: EditingEventsComponent },
      { path: '', component: HomePageComponent },
    ]),
    FlexLayoutModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatPaginatorModule,
    FormsModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
  ],
  providers: [AccountService, MatDatepickerModule, CourseService],
  bootstrap: [AppComponent],
})
export class AppModule {}
