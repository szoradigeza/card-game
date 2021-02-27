import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../../game.service';

interface Card {
  id: number;
  path: string;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() card: Card;
  isActive: boolean = false;
  constructor(private gameService: GameService) {
    this.handleCardDisable();
   }
  handleCardDisable() {
    //triggered when 2 card open
    this.gameService.obscardCanBeActive.subscribe( isActive => {
      this.isActive = false;
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