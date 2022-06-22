import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { throttle } from 'rxjs/operators';

import {
  MatDialog,
} from '@angular/material/dialog';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  game: Game;
  gameId: string;

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private firestore: AngularFirestore) {}

  ngOnInit(): void {
    console.log('page loaded');
    this.game = new Game();
    this.route.params.subscribe((params) => {
      console.log('game id:', params['id']);
      this.gameId = params['id'];
      this
      .firestore
      .collection ('games')
      .doc(this.gameId)
      .valueChanges()
      .pipe(throttle(() => interval(500)))
      .subscribe((game:any) => {
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
      })
    });

    // distribution of cards is completed
    setTimeout(() => {
      this.game.distribute = false;
    }, 4000);
  }

  saveGame() {
    this
      .firestore
      .collection('games')
      .doc(this.gameId)
      .update(this.game.toJson());
  }

  // function which allways start when someone picks a card (only possible when cardAnimation is not running)
  pickCard(index: number) {
    if (this.game.players.length >= 0 && !this.game.isTaken[index]) {
      this.game.currentFace = this.game.stack[index].face;
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

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }
}
