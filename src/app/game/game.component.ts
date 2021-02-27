import { Component, OnInit } from '@angular/core';
import { GameService } from './game.service';

interface Card {
  id: number;
  path: string;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  deckSize = 10;

  deck: Card[] = [];
  activedeck: Card[] = [];
  selectedCards: Card[] = [];


  constructor(private gameService: GameService) {
    this.deck.push(
      {id: 1, path: "assets/images/cards/angular.png"},
      {id: 2, path: "assets/images/cards/d3.png"},
      {id: 3, path: "assets/images/cards/jenkins.png"},
      {id: 4, path: "assets/images/cards/postcss.png"},
      {id: 5, path: "assets/images/cards/react.png"},
      {id: 6, path: "assets/images/cards/redux.png"},
      {id: 7, path: "assets/images/cards/sass.png"},
      {id: 8, path: "assets/images/cards/splendex.png"},
      {id: 9, path: "assets/images/cards/ts.png"},
      {id: 10, path: "assets/images/cards/webpack.png"},
    );

    for(var i = 0; i < this.deckSize; i++) {
      this.activedeck.push(this.deck[i]);
      this.activedeck.push(this.deck[i]);
    }
    this.activedeck = this.shuffle(this.activedeck);
    this.selectedCards = [];
    this.handleCardChange();
  }
  handleCardChange() {
    this.gameService.obsCard.subscribe( card => {
      if(this.selectedCards.length > 1 ) {
        if(this.selectedCards[0].id === card.id) {
          console.log("pair");
        } else {
          this.selectedCards = [];
          this.gameService.emitCardCanBeOpen();
        }
        this.selectedCards = [];
      } else {
        this.selectedCards.push(card);
      }
    })
  }

  ngOnInit(): void {
  }

   shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
}