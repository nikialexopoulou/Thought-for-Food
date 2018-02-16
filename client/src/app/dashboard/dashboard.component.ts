import { Component, OnInit } from '@angular/core';

import { Category } from '../category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  categories: Category[] = [];

  constructor(private catService: CategoryService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.catService.getCategories()
      .subscribe(categories => this.categories = categories.slice(1, 9));
  }

}
