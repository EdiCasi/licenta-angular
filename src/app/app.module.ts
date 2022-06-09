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
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { HomePageComponent } from './home-page/home-page.component';
import { StudentCoursesComponent } from './student-courses/student-courses.component';
import { StudentGradesComponent } from './student-grades/student-grades.component';
import { StudentCalendarComponent } from './student-calendar/student-calendar.component';
import { CourseService } from './course.service';
import { StudentCoursePageComponent } from './student-course-page/student-course-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    HomePageComponent,
    StudentCoursesComponent,
    StudentGradesComponent,
    StudentCalendarComponent,
    StudentCoursePageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'home', component: HomePageComponent },
      { path: 'calendar', component: StudentCalendarComponent },
      { path: 'grades', component: StudentGradesComponent },
      { path: 'studentCourses', component: StudentCoursesComponent },
      { path: 'studentCoursePage', component: StudentCoursePageComponent },
      { path: '', component: HomePageComponent },
    ]),
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    FormsModule,
    MatIconModule,
  ],
  providers: [AccountService, CourseService],
  bootstrap: [AppComponent],
})
export class AppModule {}
