import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { HomeComponent } from './components/home/home.component';
import { CreditsComponent } from './components/credits/credits.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { GalleryHomeComponent } from './components/gallery-home/gallery-home.component';
import { DownloadsHomeComponent } from './components/downloads-home/downloads-home.component';
import { DownloadsFileComponent } from './components/downloads-file/downloads-file.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'contact-us',
    pathMatch: 'full',
    component: ContactUsComponent,
  },
  {
    path: 'galllery',
    pathMatch: 'full',
    component: GalleryComponent,
  },
  {
    path: 'about-us',
    pathMatch: 'full',
    component: AboutUsComponent,
  },
  {
    path: 'coming-soon',
    pathMatch: 'full',
    component: CreditsComponent,
  },
  {
    path: 'admin',
    loadChildren:()=> import('./admin/admin.module').then(v => v.AdminModule)
  },
  {
    path: 'gallery',
    pathMatch: 'full',
    component: GalleryHomeComponent,
  },
  {
    path: 'downloads',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: DownloadsHomeComponent,
      },
      {
        path: ':folderName/:dirId',
        pathMatch: 'full',
        component: DownloadsFileComponent,
      },
    ]
  },
  {
    path: 'player',
    loadChildren:()=> import('./player/player.module').then(v => v.PlayerModule)
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
