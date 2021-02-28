import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Card } from './card.interface';


@Injectable({
  providedIn: 'root'
})
export class GameService {
  private card: Subject<Card> = new Subject();
  private closeCards:  Subject<Card[]> = new Subject();
  private pairCardId:  Subject<number> = new Subject();
  private newGamedeckSize:  Subject<number> = new Subject();
  private tries:  BehaviorSubject<number> = new BehaviorSubject(0);
  private best:  BehaviorSubject<number> = new BehaviorSubject(0);

  obsCard = this.card.asObservable();
  closeCards$ = this.closeCards.asObservable();
  pairCardId$ = this.pairCardId.asObservable();
  tries$ = this.tries.asObservable();
  best$ = this.best.asObservable();
  newGamedeckSize$ = this.newGamedeckSize.asObservable();

  constructor() { }

  emitCard(card: Card) {
    this.card.next(card);
  }
  emitCloseCards(cards: Card[]) {
    this.closeCards.next(cards);
  }
  emitPair(id: number) {
    this.pairCardId.next(id);
  }
  emitTries(triesNum: number) {
    this.tries.next(triesNum);
  }
  emitBest(bestNum: number) {
    this.best.next(bestNum);
  }

  emitNewGamedeckSize(deckSize: number) {
    this.newGamedeckSize.next(deckSize);
  }
}
