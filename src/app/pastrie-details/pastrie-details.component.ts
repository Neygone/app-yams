import { Component, OnInit, Input,  Output, EventEmitter } from '@angular/core';
import { Pastrie } from '../patrie';
import { List } from '../ingredients';
import { INGREDIENTS_LISTS, PASTRIES } from '../mock-pastries';

@Component({
  selector: 'app-pastrie-details',
  templateUrl: './pastrie-details.component.html',
  styleUrls: ['./pastrie-details.component.css']
})
export class PastrieDetailsComponent implements OnInit {

  @Input() pastrie : Pastrie | null = null; // propriété [pastrie] liée
  @Output() changePreference: EventEmitter<string> = new EventEmitter(); // C'est un évènement qui doit renvoyer un string.

  sens: boolean = true;
  ingredientsLists: List[] = INGREDIENTS_LISTS; // récupération de la liste des listes d'ingrédients
  ingredients: Array<string> = [];
  favoritePastriesId: Array<Pastrie> = [];
  pastries: Array<Pastrie> = PASTRIES;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.pastrie); // pour l'instant cela retourne undefined ... C'est normal
  }

  ngOnChanges() {
    if(this.pastrie) this.ingredients = this.ingredientsLists.find(elem => elem.id === this.pastrie?.id)?.list || [];
  }

  // Cacher les détails de la pâtisserie sélectionnée.
  hideDetails() {

  }

  // Modifier l'ordre des ingrédients d'une pâtisserie (a -> z / z -> a).
  modifyOrder() {
    if(this.sens) {
      this.ingredients.reverse();
      this.sens = false;
    } else {
      this.ingredients.reverse();
      this.sens = true;
    }
  }

  // Mettre uniquement 3 pâtisseries maximum en priorité.
  preference(id: string) {
    const find = this.pastries.find(p => p.id === id);
    const index = this.favoritePastriesId.findIndex(favoritePastrie => favoritePastrie.id === id);

    if(find && this.favoritePastriesId.length < 3) this.favoritePastriesId.push(find);
    else if(find && this.favoritePastriesId.length === 3) this.favoritePastriesId.splice(index, 1);

    this.changePreference.emit(id); // émettre l'id de la pâtisserie vers le parent
  }
}