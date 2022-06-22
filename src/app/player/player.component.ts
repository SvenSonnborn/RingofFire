import { Component, Input, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { Game } from 'src/models/game';

export interface DialogData {
  playerName: string;
  avatar: string;
}

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  @Input() name;
  @Input() player: any;
  @Input() playerActive: boolean = false;
  @Input() indexofPlayer: number;
  @Input() gameId: string;
  @Input() game: Game;
  
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}


}
