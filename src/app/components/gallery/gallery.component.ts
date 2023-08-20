import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent {
  imageIndex = 0;
  imageObjectArr = [
    {
      image: '../../../assets/gallery/g1.jpg',
      caption: 'A little progress each day leads to a big result.',
    },
    {
      image: '../../../assets/gallery/g4.jpg',
      caption: 'Knowledge is key to success in life.',
    },
    {
      image: '../../../assets/gallery/g2.jpg',
      caption: 'Positive and Friendly Environment.',
    },
    {
      image: '../../../assets/gallery/g3.jpg',
      caption: 'If you can dream it, you can do it.',
    }
   
  ];
}
