import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { throttle } from 'rxjs/operators';
import { DialogShareComponent } from '../dialog-share/dialog-share.component';
import { MatDialog } from '@angular/material/dialog';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  game: Game;
  gameId: string;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    console.log('page loaded');
    this.game = new Game();
    this.route.params.subscribe((params) => {
      console.log('game id:', params['id']);
      this.gameId = params['id'];
      this.firestore
        .collection('games')
        .doc(this.gameId)
        .valueChanges()
        .pipe(throttle(() => interval(500)))
        .subscribe((game: any) => {
          console.log('game update from firestore', game);
          console.log();
          this.game.distribute = game.distribute;
          if (!this.game.currentPlayer == game.currentPlayer) {
            this.game.currentPlayer = game.currentPlayer;
          }
          this.game.playedIndices = game.playedIndices;
          this.game.players = game.players;
          this.game.stack = game.stack;
          this.game.isTaken = game.isTaken;
          this.game.currentFace = game.currentFace;
          this.game.gameOver = game.gameOver;
          this.game.pickCardAnimation = game.pickCardAnimation;
        });
    });

    // distribution of cards is completed
    setTimeout(() => {
      this.game.distribute = false;
      this.game.pickCardAnimation = true;
      this.saveGame();
    }, 4000);
  }

  saveGame() {
    this.firestore
      .collection('games')
      .doc(this.gameId)
      .update(this.game.toJson());
  }

  // function which allways start when someone picks a card (only possible when cardAnimation is not running)
  pickCard(index: number) {
    if (
      this.game.players.length > 1 &&
      !this.game.isTaken[index] &&
      this.game.distribute === false
    ) {
      this.game.currentFace = this.game.stack[index].face;
      this.game.pickCardAnimation = false;
      this.game.playedIndices.push(index);
      console.log(
        'index: ',
        index,
        'card: ',
        this.game.currentFace,
        this.game.stack
      );
      this.saveGame();

      setTimeout(() => {
        this.game.isTaken[index] = true;
        this.game.currentPlayer++;
        this.game.currentPlayer =
          this.game.currentPlayer % this.game.players.length;
        this.game.pickCardAnimation = true;
        this.saveGame();
      }, 1000);

      if (this.game.playedIndices.length == 52) {
        setTimeout(() => {
          this.game.currentFace = '';
          this.game.gameOver = true;
        }, 4000);
      }
    }
    this.saveGame();
  }

  /**
   * start new game, players stay
   */
  reset() {
    let players = this.game.players;
    this.game = new Game();
    this.game.players = players;
    this.saveGame();
    setTimeout(() => {
      this.game.distribute = false;
      this.game.pickCardAnimation = true;
      this.saveGame();
    }, 4000);
    this.saveGame();
  }

  /**
   * calls a dialog to facilitate copying the url of the game
   */
  shareDialog(): void {
    this.dialog.open(DialogShareComponent);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.game.players.push({
          name: data.name,
          picture: data.picture,
        });
        this.saveGame();
      }
    });
  }

  editPlayer(playerId: number) {
    console.log('id is', playerId);
    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if ((data == 'DELETE')) {
          this.game.players.splice(playerId, 1)
        } else {
          this.game.players[playerId].picture = data.picture;
        }
      }
      this.saveGame();
    });
  }
}
