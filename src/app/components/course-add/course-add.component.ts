import { Component, OnDestroy, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { Subscription } from 'rxjs';
import { CourseService } from 'src/app/services/course.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit, OnDestroy {

  public course: Course;
  public subscription: Subscription;

  constructor(
    public courseService: CourseService,
    public routerService: Router,
  ) { }

  ngOnInit(): void {
    this.course = new Course();
  }

  onAddCourse() {
    this.subscription = this.courseService.addCourse(this.course).subscribe(data => {
      if (data && data.id) {
        this.routerService.navigate(['courses']);
      }
    })
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }



}
