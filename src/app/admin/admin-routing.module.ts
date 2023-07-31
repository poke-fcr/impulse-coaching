import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BatchesComponent } from './features/batches/batches.component';
import { DownloadsComponent } from './features/downloads/downloads.component';
import { NoticesComponent } from './features/notices/notices.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    pathMatch: 'full',
    component: DashboardComponent,
  },
  {
    path: 'batches',
    pathMatch: 'full',
    component: BatchesComponent,
  },
  {
    path: 'notices',
    pathMatch: 'full',
    component: NoticesComponent,
  },
  {
    path: 'downloads',
    pathMatch: 'full',
    component: DownloadsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
