import { InMemoryDbService} from 'angular-in-memory-web-api';

import { Category } from './category';
import { Recipe } from './recipe';
import { Ingredient } from './ingredient';

export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const categories: Category[] = [
      { id: 11, title: 'Infinite Jest'},
      { id: 12, title: 'Oblivion' },
      { id: 13, title: 'Ulysses' },
      { id: 14, title: 'The Crying of Lot 49' },
    ];

    const recipes: Recipe[] = [
      { id: 1, cat: 11, title: "Ceasar's Salad", calories: 250, ingredients: ["Lettuce", "Corn"]}
    ];

    const ingr: Ingredient[] = [
      { id: 1, recipe: 1,  name: "Lettuce"}
    ];

    return {categories, recipes, ingr};
  }
}
