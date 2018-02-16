import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Router } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Ingredient } from '../ingredient';
import { Recipe } from '../recipe';
import { IngredientService } from '../ingredient.service';
import { RecipeService } from '../recipe.service';
import { InMemoryDataService } from '../in-memory-data.service';
import { MessageService } from '../message.service';
import { ErrorHandlingService } from '../errorhandling.service';
import { AuthService } from '../auth.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

    ingredients: Ingredient[];

    ingredient: Ingredient;

    constructor(
      private http: HttpClient,
      private message: MessageService,
      private eh: ErrorHandlingService,
      private route: ActivatedRoute,
      private ingrService: IngredientService,
      private recService: RecipeService,
      private auth: AuthService,
      private router: Router,
    ) { }

    ngOnInit() {
      this.route.paramMap
        .switchMap((params: ParamMap) => {
          let recipeId = +params.get('id');
          if (recipeId) {
              this.ingredient = this.newIngredient(recipeId);
              return this.ingrService.getIngredients(+params.get('id'));
          } else {
              return this.ingrService.getAllIngredients();
          }
      }).subscribe(ingredients => this.ingredients = ingredients);
    }

    newIngredient(recipeId: number) : Ingredient {
      var ingredient = new Ingredient();
      ingredient.recipe = recipeId;
      ingredient.name = '';
      return ingredient;
    }

    onSubmit() : void {
      this.ingrService.addIngredient(this.ingredient)
        .subscribe(ingredient => {
          this.ingredients.unshift(ingredient);
          this.ingredient = this.newIngredient(ingredient.recipe);
        });
    }

    onSearch(ing: number[]): Observable<Recipe> {
      // this.router.navigate([`/recipes`]);
      let r = new Recipe();
      let list = Object.keys(r['title']) as Array<keyof Recipe>;
      let recipes: string[] = [];
      for (let i of ing) {
          for (let r of list) {
              for (let ing of r['ingredients']) {
                    if (ing === i) {
                        recipes.push(r);
                    }
                }
          }
      }
      let url = 'api/recipes';
       return this.http.post<Recipe>(url, recipes, httpOptions).pipe(
        tap(ing => this.message.add(`fetched recipes`)),
        catchError(this.eh.handleError<Recipe>('searchRecipes'))
       );
      // this.route.snapshot.params['ing'].map(ing => this.ingrService.searchRecipes(list));
  }

}
