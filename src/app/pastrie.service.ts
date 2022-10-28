import { Injectable } from '@angular/core';
import { PASTRIES, INGREDIENTS_LISTS } from './mock-pastries';
import { Pastrie } from './patrie';
import { List } from './ingredients';

@Injectable({
  providedIn: 'root'
})
export class PastrieService {

  constructor() { }

  pastries: Array<Pastrie> = PASTRIES; // Tableau des pâtisseries.
  ingredientsList: Array<List> = INGREDIENTS_LISTS; // Tableau des ingrédients de toutes les pâtisseries.
  searchPastries: Array<Pastrie> = []; // Tableau des pâtisseries correspondant à la recherche.

  // Récupérer toutes les pâtisseries dans l'ordre décroissant de quantité.
  getPastries(): Array<Pastrie> {
    return this.pastries.sort((a, b) => {
      return b.quantity - a.quantity;
    });
  }

  // Récupérer une pâtisserie par son ID.
  getPastrie(id: string): Pastrie | undefined {
    return this.pastries.find(p => p.id === id);
  }

  // Récupérer la liste des ingrédients d'une pâtisserie par son ID.
  getPastrieIngredientsList(id: string): List['list'] | undefined {
    return this.ingredientsList.find(i => i.id === id)?.list;
  }

  // Naviguer entre plusieurs pages de pâtisseries.
  paginate(start: number, end: number): Array<Pastrie> {
    return this.searchPastries = this.pastries.slice(start, end);
  }

  // Rechercher une ou plusieurs pâtisseries.
  // A faire: Vérifier lettre par lettre.
  search(word: string): Array<Pastrie> {
    return !word ? this.searchPastries : this.pastries.filter(p => p.name === word);
  }
}