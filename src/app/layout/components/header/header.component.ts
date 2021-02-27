import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() newGameSettings = new EventEmitter<string>();

  selected: string;
  deckSize: string[] =  [];
  minimumDeckSize = 3;
  maximumDeckSize = 10;

  constructor() {
    for(let i =this.minimumDeckSize; i <= this.maximumDeckSize; i++) {
      this.deckSize.push(i.toString());
    }
    this.selected = "3";
  }

  ngOnInit(): void {

  }

  startNewGame() {
    console.log(this.selected);
    this.newGameSettings.emit(this.selected);
  }

}
