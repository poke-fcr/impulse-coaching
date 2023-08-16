import { AfterViewInit, Component, OnInit } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent implements OnInit, AfterViewInit {
  ngAfterViewInit() {
    anime({
      targets: '.line-drawing-demo .lines path',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 3500,
      delay: function (el, i) {
        return i * 150;
      },
    });
  }
  
  title = 'hello world';
  ngOnInit(): void {}
}
