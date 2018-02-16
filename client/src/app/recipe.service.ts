import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { ErrorHandlingService } from './errorhandling.service';

import { Recipe } from './recipe';
import { Ingredient } from './ingredient';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class RecipeService {

    recipes: Recipe[];

    recipe: Recipe;

  constructor(
    private http: HttpClient,
    private message: MessageService,
    private eh: ErrorHandlingService
  ) { }

  /** GET reviews from the server */
  getRecipes(catId: number): Observable<Recipe[]> {
    let url = `api/categories/${catId}/recipes`;
    return this.http.get<Recipe[]>(url)
      .pipe(
        tap(reviews => this.message.add(`fetched recipes`)),
        catchError(this.eh.handleError('getRecipes', []))
      );
  }

  // searchRecipes(list: Recipe[]) {
  //     let url = `api/recipes/`;
  //     let rec: Recipe[] = [];
  //
  //      return this.http.get<Recipe>(url).subscribe(
  //          data => {
  //           for (let r of this.recipes) {
  //               for (let ing of r.ingredients) {
  //                   for (let i of id) {
  //                       if (ing === 'i') {
  //                           list.push(r);
  //                       }
  //                   }
  //               }
  //           }
  //       }
  //   );
  //
  //
  //      // .map(ingredients => this.recipes[ingredients] = id).pipe(
  //      //  tap((ingredients: Recipe) => this.message.add(`fetched ingredients`)),
  //      //  catchError(this.eh.handleError<Recipe>('searchRecipes'))
  //      // );
  //   }



}
