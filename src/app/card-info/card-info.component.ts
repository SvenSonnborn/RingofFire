import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Player } from 'src/models/player.class';


@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss'],
})
export class CardInfoComponent implements OnInit, OnChanges {
  cardAction = [
    {
      title: 'Waterfall',
      description:
        'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on.',
    },
    { title: 'You', description: 'You decide who drinks' },
    { title: 'Me', description: 'Congrats! Drink a shot!' },
    {
      title: 'Category',
      description:
        'Come up with a category (e.g. Colors). Each player must enumerate one item from the category.',
    },
    {
      title: 'Bust a jive',
      description:
        'Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one. ',
    },
    { title: 'Chicks', description: 'All girls drink.' },
    {
      title: 'Heaven',
      description: 'Put your hands up! The last player drinks!',
    },
    {
      title: 'Mate',
      description:
        'Pick a mate. Your mate must always drink when you drink and the other way around.',
    },
    {
      title: 'Rhyme',
      description:
        'You say a word, then the person to your right has to say a word that rhymes. This continues until someone cant think of a word. That person takes a drink. You cant reuse words.',
    },
    { title: 'Men', description: 'All men drink.' },
    {
      title: 'Categories',
      description:
        'Come up with a category of things. The person to your right must name something that falls within the category. This continues until someone cant think of something. That person takes a drink.',
    },
    {
      title: 'Never have i ever...',
      description:
        'Say something you never did. Everyone who did it has to drink.',
    },
    {
      title: 'Rule',
      description:
        'Make a rule. Everyone needs to drink when he breaks the rule.',
    },
  ];

  title = '';
  description = '';
  @Input() players: Player[];
  @Input() card: string;
  @Input() gameOver: boolean;


  constructor() {}

  ngOnInit(): void {}

  /**
   * displays the text according to the current card or other instructions
   */
  ngOnChanges(): void {
    console.log('players sind', this.players);

    if (this.gameOver) {
      this.title = 'Game over!';
      this.description = 'Do you want more? Then start a new game!';
    } else if (this.players.length == 0) {
      this.title = 'Add a player';
      this.description = 'Please add a player by clicking on the first button.';
    } else if (this.players.length == 1) {
      this.title = "Drinking alone isn't really fun";
      this.description =
        'Add more players! You can play with friends all over the world by sharing the URL of the game. ';
    } else if (this.card) {
      let currentType = +this.card.split('_')[0];
      this.title = this.cardAction[currentType - 1].title;
      this.description = this.cardAction[currentType - 1].description;
    } else {
      this.title = 'Select a card';
      this.description = 'Please click on a card of your choice.';
    }
  }
}
