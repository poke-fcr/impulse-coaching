import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageComponent } from './image/image.component';
import { PdfComponent } from './pdf/pdf.component';
import { VideoComponent } from './video/video.component';

const routes: Routes = [
  {
    path: 'video',
    pathMatch: 'full',
    component: VideoComponent,
  },
  {
    path: 'pdf',
    pathMatch: 'full',
    component: PdfComponent,
  },
  {
    path: 'image',
    pathMatch: 'full',
    component: ImageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayerRoutingModule {}
