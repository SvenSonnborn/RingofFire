import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Game } from 'src/models/game.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

export interface DialogData {
  name: string;
  picture: string;
}

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  @Input() player: any;
  @Input() playerActive: boolean = false;
  @Input() indexofPlayer: number;
  @Input() gameId: string;
  @Input() game: Game;
  @Input() firestore: AngularFirestore;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  /**
   * calls a dialog to edit a player
   * name and avatar can be changed or player be deleted completely
   * @param playerId - index of player in players
   */
  editPlayer(playerId: number) {
    const dialogRef = this.dialog.open(EditPlayerComponent, {
      data: {
        name: this.player.name,
        picture: this.player.picture,
      },
    });

    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        if (change == 'DELETE') {
          this.game.players.splice(playerId, 1);
        } else {
          this.game.players[playerId].name = change;
          //this.game.players[playerId].picture = change.picture;
        }
        this.saveGame();
      }
    });
  }

  /**
   * save game to firestore
   */
  saveGame() {
    console.log(
      'firestore',
      this.firestore,
      ' gameId: ',
      this.gameId,
      ' players: ',
      this.game.players
    );
    this.firestore
      .collection('games')
      .doc(this.gameId)
      .update(this.game.toJson());
  }
}
