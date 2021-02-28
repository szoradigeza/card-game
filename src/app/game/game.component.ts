import { Component, OnInit } from '@angular/core';
import { Card } from './card.interface';
import { GameService } from './game.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  deckSize = 5;
  deck: Card[];
  activedeck: Card[] = [];
  selectedCards: Card[] = [];
  tries = 0;
  currentScore: number = 0;

  constructor(private gameService: GameService) {
    this.deck = [
      {uniqId: null, id: 1, path: "assets/images/cards/angular.png"},
      {uniqId: null, id: 2, path: "assets/images/cards/d3.png"},
      {uniqId: null, id: 3, path: "assets/images/cards/jenkins.png"},
      {uniqId: null, id: 4, path: "assets/images/cards/postcss.png"},
      {uniqId: null, id: 5, path: "assets/images/cards/react.png"},
      {uniqId: null, id: 6, path: "assets/images/cards/redux.png"},
      {uniqId: null, id: 7, path: "assets/images/cards/sass.png"},
      {uniqId: null, id: 8, path: "assets/images/cards/splendex.png"},
      {uniqId: null, id: 9, path: "assets/images/cards/ts.png"},
      {uniqId: null, id: 10, path: "assets/images/cards/webpack.png"},
    ];

    this.makeActiveDeck();
    //this.activedeck = this.shuffle(this.activedeck);
    this.selectedCards = [];
    this.handleCardChange();
    this.handleNewGame();
  }
  handleCardChange() {
    this.gameService.obsCard.subscribe(card => {
      this.gameService.emitTries(this.tries);
      switch(this.selectedCards.length) {
        case 0: {
          this.selectedCards.push(card);
          break;
        }
        case 1: {
          if(this.selectedCards[0].id === card.id) {
            this.currentScore++;
            console.log("emit");
            this.gameService.emitBest(this.currentScore);
            this.gameService.emitPair(card.id);
            this.selectedCards = [];
          } else {
            this.selectedCards.push(card);
          }
          this.tries++;
          break;
        }
        case 2: {
          this.gameService.emitCloseCards(this.selectedCards);
          this.selectedCards = [];
          this.selectedCards.push(card);
          break;
        }
      }
    if(this.currentScore === this.activedeck.length/2) {
      setTimeout(()=>{                           //<<<---using ()=> syntax
        window.alert("You won! Congratulations!");
   }, 500);
    }
    })
  }

  handleNewGame() {
    this.gameService.newGamedeckSize$.subscribe( deckSize => {
      console.log(deckSize);
      this.deckSize = deckSize;
      this.activedeck = [];
      this.currentScore = 0;
      this.tries = 0;
      this.gameService.emitTries(this.tries);
      this.makeActiveDeck();
    } )
  }

  makeActiveDeck() {
    for(var i = 0; i < this.deckSize; i++) {
      const card1: Card = {uniqId: i, id: this.deck[i].id, path: this.deck[i].path};
      const card2: Card = {uniqId: (this.deckSize + i), id: this.deck[i].id, path: this.deck[i].path}
      this.activedeck.push(card1);
      this.activedeck.push(card2);
    }
  }

  ngOnInit(): void {
  }

   shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle
    while (0 !== currentIndex) {
  
      // Pick a remaining element
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