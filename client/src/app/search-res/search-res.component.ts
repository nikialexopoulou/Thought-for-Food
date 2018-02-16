import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';

import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-search-res',
  templateUrl: './search-res.component.html',
  styleUrls: ['./search-res.component.css']
})
export class SearchResComponent implements OnInit {

  recipes: Recipe[];

  recipe: Recipe;

  constructor(private route: ActivatedRoute, private router: Router, private recService: RecipeService) { }

  ngOnInit() {
  }
}
