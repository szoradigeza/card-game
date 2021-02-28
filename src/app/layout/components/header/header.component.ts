import { GameService } from './../../../game/game.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  selected: number;
  deckSize: string[] =  [];
  minimumDeckSize = 3;
  maximumDeckSize = 10;

  constructor(private gameService: GameService) {
    for(let i =this.minimumDeckSize; i <= this.maximumDeckSize; i++) {
      this.deckSize.push(i.toString());
    }
    this.selected = 3;
  }

  ngOnInit(): void {

  }

  startNewGame() {
    console.log(this.selected);
    this.gameService.emitNewGamedeckSize(this.selected);
  }

}
