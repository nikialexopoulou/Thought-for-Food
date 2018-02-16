import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';

import { Category } from '../category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-cat-search',
  templateUrl: './cat-search.component.html',
  styleUrls: [ './cat-search.component.css' ]
})
export class CatSearchComponent {
  public model: any;
  searching = false;
  searchFailed = false;
  hideSearchingWhenUnsubscribed =
    new Observable(() => () => this.searching = false);

  public categories$: Observable<Category[]>;

  constructor(
    private router: Router,
    private catService: CategoryService
  ) { }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searching = true)
      .switchMap(term =>
        this.catService.searchCategories(term)
          .do(() => this.searchFailed = false)
          .catch(() => {
            console.log('Failed!');
            this.searchFailed = true;
            return Observable.of([]);
          }))
      .do(() => {this.searching = false;} )
      .merge(this.hideSearchingWhenUnsubscribed);

  formatter = (b: Category) => b.title;

  selectedItem(item) {
    var cat = item.item;
    this.router.navigate([`/categories/${cat.id}`]);
  }

}
