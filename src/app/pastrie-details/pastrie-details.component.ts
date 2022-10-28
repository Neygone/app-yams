// Component enfant : la classe Input est nécessaire
import {Component, OnInit, Input,  Output, EventEmitter} from '@angular/core';
import { Pastrie } from '../patrie';
import { List } from '../ingredients';
import {INGREDIENTS_LISTS, PASTRIES} from '../mock-pastries';
import { Favorite } from '../priority';

@Component({
  selector: 'app-pastrie-details',
  templateUrl: './pastrie-details.component.html',
  styleUrls: ['./pastrie-details.component.css']
})
export class PastrieDetailsComponent implements OnInit {

  @Input() pastrie : Pastrie | null = null; // propriété [pastrie] liée
  @Output() changePreference: EventEmitter<string> = new EventEmitter(); // C'est un évènement qui doit renvoyer un string.
  @Output() pastriesButton: EventEmitter<HTMLButtonElement> = new EventEmitter();

  sens: boolean = true;
  ingredientsLists: List[] = INGREDIENTS_LISTS; // récupération de la liste des listes d'ingrédients
  ingredients: Array<string> = [];

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.pastrie); // pour l'instant cela retourne undefined ... C'est normal
  }

  // dès que quelque chose "rentre" dans le component enfant via une propriété Input
  // ou à l'initialisation du component (une fois) cette méthode est appelée
  ngOnChanges() {
    // on vérifie que l'on a bien cliqué sur une pâtisserie avant de rechercher dans la liste
    // des ingrédients.
    if(this.pastrie) {

      console.log(this.pastrie);

      // récupération de la liste des ingrédients
      this.ingredients = this.ingredientsLists.find(elem => elem.id === this.pastrie?.id)?.list || [];
    }
  }

  modifyOrder() {
    if(this.sens) {
      this.ingredients.reverse();
      this.sens = false;
    } else {
      this.ingredients.reverse();
      this.sens = true;
    }
  }

  preference(id: string, button: HTMLButtonElement) {
    this.changePreference.emit(id); // émettre l'id de la pâtisserie vers le parent
    this.pastriesButton.emit(button);
  }
}