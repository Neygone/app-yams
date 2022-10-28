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
  button: HTMLButtonElement | undefined;
  start: number = 0;
  end: number = this.pastries.length / 2;

  constructor(private service: PastrieService) { }

  ngOnInit(): void {
     this.filteredPastries = this.service.paginate(this.start, this.end);
  }

  onSelect(pastrie: Pastrie): void {
    this.selectedPastrie = pastrie;
  }

  // NON FINI !
  changeParentPreference(id: string): void {
    const pastrie = this.pastries.find(p => p.id === id);
    if(pastrie !== undefined) {
      pastrie?.priority === Favorite.NOFAV ? pastrie.priority = Favorite.FAV : pastrie.priority = Favorite.NOFAV;
        if(pastrie.priority === Favorite.FAV) {
          if(this.favoritePastries.length < 3) {
            this.favoritePastries.push(pastrie);
          }
          else {
            this.pastries.forEach((pastrie) => {
              if(pastrie.priority === Favorite.NOFAV) console.log(this.button);
            });
          }
        }
        else {
          const index = this.favoritePastries.findIndex(p => p.id === id);
          this.favoritePastries.splice(index, 1);
        }
    }
  }

  changePages(): void {
    this.filteredPastries = this.service.paginate(this.start, this.end);
  }

  count(): number {
    return this.pastries.length;
  }
}