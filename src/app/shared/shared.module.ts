import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortTimePipe } from './pipes/short-time.pipe';



@NgModule({
  declarations: [ShortTimePipe],
  imports: [
    CommonModule
  ],
  exports: [ShortTimePipe]
})
export class SharedModule { }
