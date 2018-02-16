import { Component, OnInit } from '@angular/core';

import { Category } from '../category';
import { CategoryService } from '../category.service';
import { InMemoryDataService } from '../in-memory-data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {

  categories: Category[];
  selectedCategory : Category;

  constructor(private catService: CategoryService) { }

  ngOnInit() {
    this.getCategories();
  }

  onSelect(category: Category): void {
    this.selectedCategory = category;
  }

  getCategories(): void {
    this.catService.getCategories()
      .subscribe(categories => this.categories = categories);
  }
}
