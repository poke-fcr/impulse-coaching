import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { HomeComponent } from './components/home/home.component';
import { CreditsComponent } from './components/credits/credits.component';

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
    loadChildren:()=> import('./admin/admin-routing.module').then(v => v.AdminRoutingModule)
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
