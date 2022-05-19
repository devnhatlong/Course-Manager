import { Component, OnDestroy, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { Subscription } from 'rxjs';
import { CourseService } from 'src/app/services/course.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit, OnDestroy {

  public course: Course;
  public subscription: Subscription;
  public subscriptionParams: Subscription;

  constructor(
    public courseService: CourseService,
    public routerService: Router,
    public activatedRouteService: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.course = new Course();
    this.loadData();
  }

  loadData() {
    this.subscriptionParams = this.activatedRouteService.params.subscribe((data: Params) => {
      let id = data['id'];
      this.subscription = this.courseService.getCourse(id).subscribe((course: Course) => {
        this.course = course;
      })
    });
  }

  onEditCourse() {
    this.subscription = this.courseService.updateCourse(this.course).subscribe((data: Course) => {
      this.routerService.navigate(['courses']);
    })
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscriptionParams) {
      this.subscriptionParams.unsubscribe();
    }
  }

}
