import { GameService } from './../../../game/game.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-counter',
  templateUrl: './game-counter.component.html',
  styleUrls: ['./game-counter.component.css']
})
export class GameCounterComponent implements OnInit {
  tries: number;
  best: number = 0;

  constructor(private gameService: GameService ) { 
    this.gameService.tries$.subscribe(tries => {
      this.tries = tries;
    });
    this.gameService.best$.subscribe(best => {
      console.log(best);
      if(this.best < best) {
        this.best = best;
      }
    });
  }

  ngOnInit(): void {
  }

}
