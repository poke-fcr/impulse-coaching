import { AfterViewInit, Component, OnInit } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent implements OnInit, AfterViewInit {
  screenSizeLtMedium: boolean = window.innerWidth < 762 ? true : false;
  tl = anime.timeline({
    easing: 'easeOutExpo',
    duration: 750,
  });

  ngAfterViewInit() {
    let textWrapper = document.querySelector('.my-description');
    if (textWrapper && textWrapper.textContent)
      textWrapper.innerHTML = textWrapper.textContent.replace(
        /\S/g,
        "<span class='letter'>$&</span>"
      );

    if (!this.screenSizeLtMedium) {
      this.tl.add({
        targets: '.line-drawing-demo .lines path',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 2000,
        delay: function (el, i) {
          return i * 150;
        },
      });
     
      
    } else{
      let textWrapper = document.querySelector('#heading');
      if (textWrapper && textWrapper.textContent)
        textWrapper.innerHTML = textWrapper.textContent.replace(
          /\S/g,
          "<span class='letter h1'>$&</span>"
        );
        this.tl.add({
          targets: '#heading .letter',
          opacity: [0, 1],
          translateZ: 0,
          easing: 'easeOutExpo',
          duration: 500,
          delay: (el, i) => 50 * i,
        }, 1000);
    }

   
   

    this.tl.add({
      targets: '#image-one',
      translateX: ['-2500px', 0], // -> '250px'
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 2000,
    })

    let textWrapper1 = document.querySelector('#text-one');
      if (textWrapper1 && textWrapper1.textContent)
        textWrapper1.innerHTML = textWrapper1.textContent.replace(
          /\S/g,
          "<span class='letter h4'>$&</span>"
        );
    this.tl.add({
      targets: '#text-one .letter',
      opacity: [0, 1],
      translateZ: 0,
      easing: 'easeOutExpo',
      duration: 2000,
      delay: (el, i) => 25 * i,
    });

  }
  ngOnInit(): void {}
}
