import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { ErrorHandlingService } from './errorhandling.service';

import { Ingredient } from './ingredient';
import { Recipe } from './recipe';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Pipe({
name: 'FilterPipe',
})

@Injectable()
export class IngredientService {

    constructor(
      private http: HttpClient,
      private message: MessageService,
      private eh: ErrorHandlingService
    ) { }

    /** GET reviews from the server */
    getIngredients(recipeId: number): Observable<Ingredient[]> {
      let url = `api/recipes/${recipeId}/reviews`;
      return this.http.get<Ingredient[]>(url)
        .pipe(
          tap(reviews => this.message.add(`fetched ingredients`)),
          catchError(this.eh.handleError('getIngredients', []))
        );
    }

    private ingUrl = 'api/ingredients';

    getAllIngredients(): Observable<Ingredient[]> {
        return this.http.get<Ingredient[]>(this.ingUrl)
          .pipe(
            tap(ingredients => this.message.add(`fetched ingredients`)),
            catchError(this.eh.handleError('getAllIngredients', []))
          );
    }

    /** POST: add a new review to the server */
    addIngredient(ingredient: Ingredient): Observable<Ingredient> {
      let url = `api/recipes/${ingredient.recipe}/reviews`;
      return this.http.post<Ingredient>(url, ingredient, httpOptions).pipe(
        tap((recipe: Ingredient) => this.message.add(`added ingredient w/ id=${ingredient.id}`)),
        catchError(this.eh.handleError<Ingredient>('addIngredient'))
      );
    }

}
