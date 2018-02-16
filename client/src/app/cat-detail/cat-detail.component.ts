import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CategoryService }  from '../category.service';

import { Category } from '../category';

@Component({
  selector: 'app-cat-detail',
  templateUrl: './cat-detail.component.html',
  styleUrls: ['./cat-detail.component.css']
})
export class CatDetailComponent implements OnInit {

  @Input()
  category: Category;

  constructor(
    private route: ActivatedRoute,
    private catService: CategoryService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getCategory();
  }

  getCategory(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.catService.getCategory(id).subscribe(category => this.category = category);
  }

  goBack(): void {
    this.location.back();
  }
  //
  // save(): void {
  //   this.catService.updateBook(this.category)
  //     .subscribe(() => this.goBack());
  // }

}
