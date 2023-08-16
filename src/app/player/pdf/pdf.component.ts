import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player/player.service';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss'],
})
export class PdfComponent implements OnInit {
  pdfSrc: string = ''
  constructor(private playerSvc: PlayerService) {}

  ngOnInit() {
    this.pdfSrc = this.playerSvc.playerData.url
  }


  // pdfSrc = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  fetchStatus: 'fetching' | 'done' | 'error' = 'fetching';
  callBackFn(e: any) {
    this.fetchStatus = 'done';
  }

  onError(error: any) {
    this.fetchStatus = 'error'
  }
}
