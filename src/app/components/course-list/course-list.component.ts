import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Course } from 'src/app/models/course.model';


@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {


  public API: string = 'http://localhost:3000/courses';

  public courses: Course[] = [];
  public subscription: Subscription;

  constructor(
    public courseService: CourseService,
    public http: HttpClient,

  ) { }

  ngOnInit(): void {
    this.subscription = this.courseService.getAllCourses().subscribe((data: any) => {
      this.courses = data;
    })
  }

  // ngOnDestroy(): void {
  //   if (this.subscription) {
  //     this.subscription.unsubscribe();
  //   }
  // }

  onDeleteCourse(id: number) {
    this.subscription = this.courseService.deleteCourse(id).subscribe((data: Course) => {
      this.updateDataAfterDelete(id);
    })
  }

  updateDataAfterDelete(id: number) {
    for (let i = 0; i < this.courses.length; i++) {
      if (this.courses[i].id == id) {
        this.courses.splice(i, 1);
      }
    }
  }

}
