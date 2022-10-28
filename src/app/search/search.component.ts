import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PastrieService } from '../pastrie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private service: PastrieService) { }

  @Output() word = new EventEmitter<string>();
  newValue: string = '';

  ngOnInit(): void {
  }

  // Effectuer une recherche de pâtisserie(s) sans soumettre un formulaire.
  onChangeEmit(word: string) {
    this.newValue = word;
    this.word.emit(word);
    this.service.search(word);
  }
}