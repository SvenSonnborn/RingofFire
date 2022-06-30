import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from "@angular/forms";


@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})
export class DialogAddPlayerComponent{
  form: FormGroup;

  allProfilePictures = ['user1.png', 'user2.png', 'user3.png', 'user4.png', 'user5.png', 'user6.png', 'user7.png']

  standardPicture = this.allProfilePictures[0];


  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<DialogAddPlayerComponent>,) {
    this.form = this.formBuilder.group({ name: '', picture: this.standardPicture })
   }
}
