import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerData } from 'src/app/model/PlayerData';
import { PlayerService } from 'src/app/services/player/player.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent {
  playerData!: PlayerData;
  fetchStatus: 'fetching' | 'error' | 'done' = 'fetching';
  constructor(private playerSvc: PlayerService, private router: Router) {}

  ngOnInit() {
    this.playerData = this.playerSvc.playerData;
    console.log(this.playerData);
    if (this.playerData) {
      this.fetchStatus = 'done';
      console.log(this.playerData);
    } else {
      this.fetchStatus = 'error';
      alert('something went wrong. Lets start over!');
      this.router.navigate(['']);
    }
  }

  ngAfterViewInit() {}
}
