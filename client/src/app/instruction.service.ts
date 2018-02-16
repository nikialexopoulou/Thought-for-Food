import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { ErrorHandlingService } from './errorhandling.service';

import { Instruction } from './instruction';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class InstructionService {

    constructor(
      private http: HttpClient,
      private message: MessageService,
      private eh: ErrorHandlingService
    ) { }

    /** GET reviews from the server */
    getInstructions(recipeId: number): Observable<Instruction[]> {
      let url = `api/recipes/${recipeId}/reviews`;
      return this.http.get<Instruction[]>(url)
        .pipe(
          tap(instructions => this.message.add(`fetched instructions`)),
          catchError(this.eh.handleError('getInstructions', []))
        );
    }

}
