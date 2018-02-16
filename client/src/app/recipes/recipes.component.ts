import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';
import { InMemoryDataService } from '../in-memory-data.service';
import { MessageService } from '../message.service';
import { ErrorHandlingService } from '../errorhandling.service';

import { AuthService } from '../auth.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

    recipes: Recipe[];

    recipe: Recipe;

    constructor(
      private route: ActivatedRoute,
      private recService: RecipeService,
      private auth: AuthService,
      private http: HttpClient,
      private message: MessageService,
      private eh: ErrorHandlingService
    ) { }

    ngOnInit() {
      this.route.paramMap
        .switchMap((params: ParamMap) => {
          let catId = +params.get('id');
          return this.recService.getRecipes(+params.get('id'))
      }).subscribe(recipes => this.recipes = recipes);
    }

}
