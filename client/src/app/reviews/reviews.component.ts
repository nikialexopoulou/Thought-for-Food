import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';

import { Review } from '../review';
import { ReviewService } from '../review.service';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent implements OnInit {

  reviews: Review[];

  review: Review;

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private location: Location,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        let catId = +params.get('id');
        this.review = this.newReview(catId);
        return this.reviewService.getReviews(+params.get('id'))
      }).subscribe(reviews => this.reviews = reviews);
  }

  newReview(recId: number) : Review {
    var review = new Review();
    review.rec = recId;
    review.title = '';
    review.text = '';
    return review;
  }

  onSubmit() : void {
    this.reviewService.addReview(this.review)
      .subscribe(review => {
        this.reviews.unshift(review);
        this.review = this.newReview(review.rec);
      });
  }

  goBack(): void {
    this.location.back();
  }

}
