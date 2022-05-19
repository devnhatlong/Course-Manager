import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseAddComponent } from './components/course-add/course-add.component';
import { CourseEditComponent } from './components/course-edit/course-edit.component';
import { CourseService } from './services/course.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'courses',
    component: CoursesComponent,
    children: [
      {
        path: '',
        component: CourseListComponent,
      },
      {
        path: ':id/edit',
        component: CourseEditComponent,
      },
      {
        path: 'add',
        component: CourseAddComponent,
      }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CoursesComponent,
    CourseListComponent,
    CourseAddComponent,
    CourseEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatButtonModule,
  ],
  providers: [
    CourseService
  ],
  bootstrap: [AppComponent, CourseListComponent]
})
export class AppModule { }
