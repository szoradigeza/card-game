import { Component, Input, OnInit } from '@angular/core';
import { Subscriber, Subscription } from 'rxjs';
import { Card } from '../../card.interface';
import { GameService } from '../../game.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() card: Card;
  isActive: boolean = false;
  closeCardSub: Subscription;


  constructor(private gameService: GameService) {
    this.handleCardDisable();
    this.handleCardPair();
   }
  handleCardDisable() {
    //triggered when 2 card open
    this.closeCardSub = this.gameService.closeCards$.subscribe( cards=> {
      if (cards.includes(this.card) ) {
        this.isActive = false;
      }
    } )
  }

  handleCardPair() {
    this.gameService.pairCardId$.subscribe( id => {
      if(id == this.card.id) {
       this.closeCardSub.unsubscribe();
      }
    } )
  }

  ngOnInit(): void {
  }

  show() {
    if (!this.isActive){
    this.isActive = !this.isActive;
    this.gameService.emitCard(this.card);
    }
  }

}