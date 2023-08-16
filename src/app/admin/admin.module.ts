import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BatchesComponent } from './features/batches/batches.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NoticesComponent } from './features/notices/notices.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DownloadsComponent } from './features/downloads/downloads.component';
import { FileUploadService } from '../services/file-upload.service';
import { FormsModule } from '@angular/forms';
import { DownloadsFileComponent } from './features/downloads-file/downloads-file.component';
import { GalleryAdminComponent } from './features/gallery-admin/gallery-admin.component';

@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    BatchesComponent,
    NoticesComponent,
    DownloadsComponent,
    DownloadsFileComponent,
    GalleryAdminComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    CKEditorModule,
    FormsModule,
  ],
})
export class AdminModule {}
