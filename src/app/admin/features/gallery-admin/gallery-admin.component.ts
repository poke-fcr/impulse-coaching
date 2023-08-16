import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs';
import { FileUpload } from 'src/app/model/FileUpload';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { PlayerService } from 'src/app/services/player/player.service';

@Component({
  selector: 'app-gallery-admin',
  templateUrl: './gallery-admin.component.html',
  styleUrls: ['./gallery-admin.component.scss'],
})
export class GalleryAdminComponent {
  title: string = '';
  id: string = '';
  fetchStatus: 'fetching' | 'done' | 'error' = 'fetching';
  files: any[] = [];

  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;

  fileName: string = '';

  mimeType: string | undefined = '';
  fileType: string = 'image';
  constructor(private fileSvc: FileUploadService, private ngbModal: NgbModal, private router: Router) {}

  ngOnInit() {
    this.title = 'Gallery';
    this.id = 'gallery-home';
    this.loadData();
  }

  loadData() {
    this.fileSvc
      .getFiles(this.id)
      .snapshotChanges()
      .pipe(
        map((changes: any[]) =>
          // store the key
          changes.map((c: { payload: { key: any; val: () => any } }) => ({
            key: c.payload.key,
            ...c.payload.val(),
          }))
        )
      )
      .subscribe(
        (fileUploads) => {
          console.log('rh', fileUploads);
          this.files = fileUploads;
          this.fetchStatus = 'done';
        },
        (_e) => {
          this.fetchStatus = 'error';
        }
      );
  }

  openNewFileDialog(dialogRef: any) {
    let modalRef = this.ngbModal.open(dialogRef, {
      size: 'md',
      centered: true,
    });

    modalRef.dismissed.subscribe({
      next: (_r: any) => {
        this.fileName = '';
        this.selectedFiles = undefined;
        this.currentFileUpload = undefined;
        this.mimeType = '';
        this.percentage = 0;
        console.log('dismissed');
      },
    });
    modalRef.closed.subscribe({
      next: (_r: any) => {
        this.fileName = '';
        this.mimeType = '';
        this.selectedFiles = undefined;
        this.currentFileUpload = undefined;
        this.percentage = 0;
        // this.folderName = '';
      },
    });
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  uploadFile() {
    if (this.selectedFiles) {
      let file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      this.mimeType = file?.type;
      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.fetchStatus = 'fetching';
        let metaData = {
          fileName: this.fileName,
          mimeType: this.mimeType,
          fileType: this.fileType,
        };
        this.fileSvc
          .pushFileToStorage(this.id, this.currentFileUpload, metaData)
          .subscribe(
            (percentage) => {
              this.percentage = Math.round(percentage ? percentage : 0);
              console.log(percentage);
              if (percentage == 100) {
                this.ngbModal.dismissAll();
                this.loadData();
              }
            },
            (error) => {
              console.log(error);
            }
          );
      }
    }
  }

  deleteFile(d: any) {
    this.fetchStatus = 'fetching';
    this.fileSvc.deleteFile(this.id, d).then(() => {
      this.loadData();
    });
  }

  previewFile(d: any) {
    // this.playerSvc.playerData = d;
    // this.playerSvc.playerData = d;
    // if (d.fileType == 'video') this.router.navigate(['player/video']);
    // else if (d.fileType == 'pdf') this.router.navigate(['player/pdf']);
    // else alert('Funcionality for pdf player under development');
    this.router.navigate(['player/image']);
  }
}
