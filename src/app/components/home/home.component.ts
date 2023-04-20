import { AfterContentInit, Component, ViewChild } from '@angular/core';
import { NgbCarousel, NgbCarouselConfig, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent
 {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);


	@ViewChild('carousel', { static: true }) carousel!: NgbCarousel;




}
