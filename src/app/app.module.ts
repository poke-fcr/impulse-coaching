import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { FooterComponent } from './components/footer/footer.component';
import { CreditsComponent } from './components/credits/credits.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { BatchesHomeComponent } from './components/batches-home/batches-home.component';
import { HttpClientModule } from '@angular/common/http'
import { AppService } from './app-service.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactUsComponent,
    AboutUsComponent,
    FooterComponent,
    CreditsComponent,
    GalleryComponent,
    BatchesHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbCarouselModule,
    HttpClientModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
