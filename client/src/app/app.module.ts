import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule }    from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';

import { AppComponent } from './app.component';
import { CategoriesComponent } from './categories/categories.component';
import { ItalicsDirective } from './italics.directive';
import { CatDetailComponent } from './cat-detail/cat-detail.component';
import { CategoryService } from './category.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { ErrorHandlingService } from './errorhandling.service';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CatSearchComponent } from './cat-search/cat-search.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewService } from './review.service';
import { RecipeService } from './recipe.service';
import { IngredientService } from './ingredient.service';
import { InstructionService } from './instruction.service';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { RecipesComponent } from './recipes/recipes.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { SearchResComponent } from './search-res/search-res.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    ItalicsDirective,
    CatDetailComponent,
    MessagesComponent,
    DashboardComponent,
    CatSearchComponent,
    ReviewsComponent,
    LoginComponent,
    RecipesComponent,
    IngredientsComponent,
    InstructionsComponent,
    SearchResComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule.forRoot(),
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [
    CategoryService,
    MessageService,
    ErrorHandlingService,
    ReviewService,
    RecipeService,
    IngredientService,
    InstructionService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
