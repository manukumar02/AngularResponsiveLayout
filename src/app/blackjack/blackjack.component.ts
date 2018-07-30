import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blackjack',
  templateUrl: './blackjack.component.html',
  styleUrls: ['./blackjack.component.css']
})
export class BlackjackComponent implements OnInit {
  suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
  values = [
    'Ace',
    'King',
    'Queen',
    'Jack',
    'Ten',
    'Nine',
    'Eight',
    'Seven',
    'Six',
    'Five',
    'Four',
    'Three',
    'Two',
    'One'
  ];

  introMessage = 'Welcome to Blackjack!';

  isNewGame = true;
  isHit = false;
  isStay = false;

  gameStarted = false;
  gameOver = false;
  playerWon = false;
  dealerCards = [];
  playerCards = [];
  dealerScore = 0;
  playerScore = 0;
  deck = [];

  constructor() {}

  ngOnInit() {}

  createDeck() {
    this.deck = [];
    for (let suitIdx = 0; suitIdx < this.suits.length; suitIdx++) {
      for (let valueIdx = 0; valueIdx < this.values.length; valueIdx++) {
        const card = {
          suit: this.suits[suitIdx],
          value: this.values[valueIdx]
        };
        this.deck.push(card);
      }
    }
    return this.deck;
  }

  getNextCard() {
    return this.deck.shift();
  }

  getCardString(card) {
    return card.value + ' ' + card.suit;
  }
  blackjackNewGame() {
    this.gameStarted = true;
    this.gameOver = false;
    this.playerWon = false;

    this.deck = this.createDeck();
    this.shuffleDeck(this.deck);
    this.dealerCards = [this.getNextCard(), this.getNextCard()];
    this.playerCards = [this.getNextCard(), this.getNextCard()];

    this.isNewGame = false;
    this.isHit = true;
    this.isStay = true;

    this.showStatus();
  }
  blackjackHit() {
    this.playerCards.push(this.getNextCard());
    this.checkForEndOfGame();
    this.showStatus();
  }
  blackjackStay() {
    this.gameOver = true;
    this.checkForEndOfGame();
    this.showStatus();
  }

  shuffleDeck(deck) {
    for (let i = 0; i < deck.length; i++) {
      const swapIdx = Math.trunc(Math.random() * deck.length);
      const tmp = deck[swapIdx];
      deck[swapIdx] = deck[i];
      deck[i] = tmp;
    }
  }
  showStatus() {
    if (!this.gameStarted) {
      this.introMessage = 'Welcome to Blackjack!';
      return;
    }

    let dealerCardString = '';
    let playerCardString = '';

    for (let i = 0; i < this.playerCards.length; i++) {
      playerCardString += this.getCardString(this.playerCards[i]) + '\n';
    }

    for (let i = 0; i < this.dealerCards.length; i++) {
      dealerCardString += this.getCardString(this.dealerCards[i]) + '\n';
    }

    this.updateScore();

    // for (let i = 0; i < this.deck.length; i++) {
    //   this.introMessage += '\n' + this.getCardString(this.deck[i]);
    // }
    this.introMessage =
      'Dealer has:\n ' +
      dealerCardString +
      '(score: ' +
      this.dealerScore +
      ')\n\n' +
      'Player has:\n ' +
      playerCardString +
      '(score: ' +
      this.playerScore +
      ')\n\n';

    if (this.gameOver) {
      if (this.playerWon) {
        this.introMessage += 'YOU WON!';
      } else {
        this.introMessage += 'DEALER WINS';
      }

      this.isNewGame = true;
      this.isHit = false;
      this.isStay = false;
    }
  }

  updateScore() {
    this.dealerScore = this.getScore(this.dealerCards);
    this.playerScore = this.getScore(this.playerCards);
  }

  getScore(cardArray) {
    let score = 0;
    let hasAce = false;
    for (let i = 0; i < cardArray.length; i++) {
      const card = cardArray[i];
      score += this.getCardNumericValue(card);
      if (card.value === 'Ace') {
        hasAce = true;
      }
    }
    if (hasAce && score + 10 <= 21) {
      return score + 10;
    }

    return score;
  }

  getCardNumericValue(card) {
    switch (card.value) {
      case 'Ace':
        return 1;
      case 'Two':
        return 2;
      case 'Three':
        return 3;
      case 'Four':
        return 5;
      case 'Five':
        return 5;
      case 'Six':
        return 6;
      case 'Seven':
        return 7;
      case 'Eight':
        return 8;
      case 'Nine':
        return 9;
      default:
        return 10;
    }
  }

  checkForEndOfGame() {
    this.updateScore();

    if (this.gameOver) {
      while (
        this.dealerScore < this.playerScore &&
        this.playerScore <= 21 &&
        this.dealerScore <= 21
      ) {
        this.dealerCards.push(this.getNextCard());
        this.updateScore();
      }
    }

    if (this.playerScore > 21) {
      this.playerWon = false;
      this.gameOver = true;
    } else if (this.dealerScore > 21) {
      this.playerWon = true;
      this.gameOver = true;
    } else if (this.gameOver) {
      if (this.playerScore > this.dealerScore) {
        this.playerWon = true;
      } else {
        this.playerWon = false;
      }
    }

    this.isNewGame = true;
    this.isHit = false;
    this.isStay = false;
  }
}
