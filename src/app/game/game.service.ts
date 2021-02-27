import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


interface Card {
  id: number;
  path: string;
}
@Injectable({
  providedIn: 'root'
})
export class GameService {
  private card: Subject<Card> = new Subject();
  private cardCanBeActive:  Subject<boolean> = new Subject();
  obsCard = this.card.asObservable();
  obscardCanBeActive = this.cardCanBeActive.asObservable();
  constructor() { }

  emitCard(card: Card) {
    this.card.next(card);
  }
  emitCardCanBeOpen() {
    this.cardCanBeActive.next(false);
  }

}
