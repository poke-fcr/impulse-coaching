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
import { GalleryHomeComponent } from './components/gallery-home/gallery-home.component';
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireStorageModule} from '@angular/fire/compat/storage'
import { environment } from 'src/environments/environment.development';
import { AngularFireDatabaseModule} from '@angular/fire/compat/database'
import { FileUploadService } from './services/file-upload.service';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { BatchesService } from './services/firestore/batches.service';
import { NoticesService } from './services/firestore/notices.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactUsComponent,
    AboutUsComponent,
    FooterComponent,
    CreditsComponent,
    GalleryComponent,
    BatchesHomeComponent,
    GalleryHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbCarouselModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ],
  providers: [AppService, FileUploadService, BatchesService, NoticesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
