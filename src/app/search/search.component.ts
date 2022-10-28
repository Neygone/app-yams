import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PastrieService } from '../pastrie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private service: PastrieService) { }

  @Output() searchValue: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    console.log(form.value['word']); // récupération d'une valeur spécifique
    this.service.search(form.value['word']);
    this.searchValue.emit(form.value['word']);
  }
}