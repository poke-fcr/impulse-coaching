import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerRoutingModule } from './player-routing.module';
import { VideoComponent } from './video/video.component';
import { PdfComponent } from './pdf/pdf.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';


@NgModule({
  declarations: [
    VideoComponent,
    PdfComponent
  ],
  imports: [
    CommonModule,
    PlayerRoutingModule,
    PdfViewerModule
  ]
})
export class PlayerModule { }
