import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Player } from 'src/models/player.class';


@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit{

  allProfilePicutres = ['user1.png', 'user2.png', 'user3.png', 'user4.png', 'user5.png', 'user6.png', 'user7.png']

  constructor(public dialogRef: MatDialogRef<EditPlayerComponent>,) { }

  ngOnInit(): void {
    
  }

}
