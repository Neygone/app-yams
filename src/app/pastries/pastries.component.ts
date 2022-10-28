import { Component, OnInit } from '@angular/core';
import { Pastrie } from '../patrie';
import { PASTRIES, INGREDIENTS_LISTS } from '../mock-pastries';
import { List } from '../ingredients';
import { PastrieService } from '../pastrie.service';
import { Favorite } from '../priority';

@Component({
  selector: 'app-pastries',
  templateUrl: './pastries.component.html',
  styleUrls: ['./pastries.component.css']
})
export class PastriesComponent implements OnInit {

  pastries: Array<Pastrie> = PASTRIES;
  filteredPastries: Array<Pastrie> = PASTRIES;
  titlePage: string = "Page principale: Les pâtisseries à gagner";
  ingredientsList: Array<List> = INGREDIENTS_LISTS; // Tableau des ingrédients de toutes les pâtisseries.
  ingredients: Array<string> | undefined; // Tableau des ingrédients d'une seule pâtisserie.
  favoritePastries: Array<Pastrie> = [];
  selectedPastrie: Pastrie | null = null;
  start: number = 0;
  end: number = this.pastries.length / 2;
  searchInput: string = '';

  constructor(private service: PastrieService) { }

  ngOnInit(): void {
    this.changePages();
  }

  // Sélectionne une pâtisserie.
  onSelect(pastrie: Pastrie): void {
    this.selectedPastrie = pastrie;
  }

  // Change la priorité de la pâtisserie.
  changeParentPreference(id: string): void {
    const pastrie = this.pastries.find(p => p.id === id);
    if(pastrie !== undefined) pastrie?.priority === Favorite.NOFAV ? pastrie.priority = Favorite.FAV : pastrie.priority = Favorite.NOFAV;
  }

  // Changer la page des pâtisseries.
  changePages(): void {
    this.filteredPastries = this.service.paginate(this.start, this.end);
  }

  // Retourner le nombre de pâtisseries.
  count(): number {
    return this.pastries.length;
  }

  // Rechercher une ou plusieurs pâtisseries à partir d'un texte rentré dans un input.
  searchPastries(word: string): void {
    this.searchInput = word;
    this.filteredPastries = this.service.search(word);
  }
}