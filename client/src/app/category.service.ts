import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { ErrorHandlingService } from './errorhandling.service';

import { Category } from './category';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CategoryService {

  private catsUrl = 'api/categories';

  constructor(
    private http: HttpClient,
    private message: MessageService,
    private eh: ErrorHandlingService
  ) { }

  /** GET categories from the server */
  getCategories(): Observable<Category[]> {
   return this.http.get<Category[]>(this.catsUrl)
     .pipe(
       tap(categories => this.message.add(`fetched categories`)),
       catchError(this.eh.handleError('getCategories', []))
     );
  }

  /** GET category by id. Will 404 if id not found */
  getCategory(id: number): Observable<Category> {
      const url = `${this.catsUrl}/${id}`;
      return this.http.get<Category>(url).pipe(
        tap(_ => this.message.add(`fetched category id=${id}`)),
        catchError(this.eh.handleError<Category>(`getCategory id=${id}`))
      );
}

  /* GET categories whose title contains search term */
  searchCategories(term: string): Observable<Category[]> {
    if (!term.trim()) {
      // if not search term, return empty Category array.
      return of([]);
    }
    return this.http.get<Category[]>(`api/categories/?title=${term}`).pipe(
      tap(_ => this.message.add(`found categories matching "${term}"`)),
      catchError(this.eh.handleError<Category[]>('searchCategories', []))
    );
  }

}
