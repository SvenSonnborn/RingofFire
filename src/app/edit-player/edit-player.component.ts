import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Player } from 'src/models/player.class';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss'],
})
export class EditPlayerComponent {
  form: FormGroup;

  allProfilePictures = [
    'user1.png',
    'user2.png',
    'user3.png',
    'user4.png',
    'user5.png',
    'user6.png',
    'user7.png',
  ];
  standardPicture = this.allProfilePictures[0];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditPlayerComponent>
  ) {
    this.form = this.formBuilder.group({
      name: '',
      picture: this.standardPicture,
    });
    {
    }
  }
}
