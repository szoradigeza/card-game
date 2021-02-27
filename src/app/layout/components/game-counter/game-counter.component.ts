import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-counter',
  templateUrl: './game-counter.component.html',
  styleUrls: ['./game-counter.component.css']
})
export class GameCounterComponent implements OnInit {
  tries: string;
  best: string;

  constructor() { 
    this.tries = "1";
    this.best = "1";
  }

  ngOnInit(): void {
  }

}
