import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
title = "hello world"
ngOnInit(): void {
  setTimeout(() => {
      this.title = "Bye world"
  }, 3000);
}
}
