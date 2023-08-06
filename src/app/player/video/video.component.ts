import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { PlayerData } from 'src/app/model/PlayerData';
import { PlayerService } from 'src/app/services/player/player.service';
import videojs, { VideoJsPlayerOptions } from 'video.js';
// import Player from "video.js/dist/types/player";
// import * as videojs from 'videojs';
// declare var videojs: any;

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements AfterViewInit, OnInit {
  playerData!: PlayerData;
  fetchStatus: 'fetching' | 'error' | 'done' = 'fetching';
  @ViewChild('target', { static: false }) target!: ElementRef;
  options!: VideoJsPlayerOptions
  player!: videojs.Player;
  constructor(private playerSvc: PlayerService, private router: Router) {}

  ngOnInit() {
    this.playerData = this.playerSvc.playerData;
    console.log(this.playerData);
    if (this.playerData) {
      // let vjs =  document.getElementsByClassName("video-js").
      // videojs(, {
      //   controls: true,
      //   autoplay: false,
      //   preload: 'auto'
      // });
      let height = window.innerHeight
      let width = window.innerWidth
      let tempOptions = {}
      //desktop mode
      if(width > height)
      {
      
        height = height - 150
        console.log('rh2', height)
      }

      this.options = {
        autoplay: true,
        fluid: true,
        sources: [
          {
            src: this.playerData.url,
            type: 'video/mp4' || '',
          },
        ],
      };

      this.fetchStatus = 'done';

      console.log(this.playerData);
    } else {
      this.fetchStatus = 'error';
      alert('something went wrong. Lets go home and start over!');
      this.router.navigate(['']);
    }
  }

  ngAfterViewInit() {
    this.player = videojs(
      this.target.nativeElement,
      this.options,
      function onPlayerReady() {
        console.log('onPlayerReady');
      }
    );
  }
}
