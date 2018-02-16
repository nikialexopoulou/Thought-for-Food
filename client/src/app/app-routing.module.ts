import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoriesComponent } from './categories/categories.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { CatDetailComponent } from './cat-detail/cat-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { RecipesComponent } from './recipes/recipes.component';
import { LoginComponent } from './login/login.component';
import { SearchResComponent } from './search-res/search-res.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'categories', component: CategoriesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'categories/:id', component: CatDetailComponent },
  { path: 'categories/:id/recipes', component: RecipesComponent },
  { path: 'recipes/:id/reviews', component: ReviewsComponent },
  { path: 'recipes', component: IngredientsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'ingredients', component: IngredientsComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
