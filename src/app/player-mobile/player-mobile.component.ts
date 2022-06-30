import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/models/game.class';

@Component({
  selector: 'app-player-mobile',
  templateUrl: './player-mobile.component.html',
  styleUrls: ['./player-mobile.component.scss']
})
export class PlayerMobileComponent implements OnInit {
  @Input() name;
  @Input() player: any;
  @Input() image: any = 'user1.png';
  @Input() playerActive: boolean = false;
  @Input() indexofPlayer: number;
  @Input() gameId: string;
  @Input() game: Game;

  constructor() { }

  ngOnInit(): void {
  }

}
