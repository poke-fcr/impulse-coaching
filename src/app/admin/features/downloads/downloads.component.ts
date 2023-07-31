import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { DirectoriesService } from 'src/app/services/firestore/directories.service';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss'],
})
export class DownloadsComponent implements OnInit {
  constructor(
    private ngbModal: NgbModal,
    private dirSvc: DirectoriesService
  ) {}
  directoryFetchStatus: 'fetching' | 'done' | 'error' = 'fetching';
  folderName: string = '';
  directories: any[] = [];
  ngOnInit() {
    this.getAllDirectories()
  }

  addDirectory() {
    alert(this.folderName);
    this.directoryFetchStatus = 'fetching';
    this.dirSvc
      .createdirectory({
        directoryId: new Date().getTime(),
        directoryName: this.folderName,
      })
      .then(() => {
        this.getAllDirectories();
      })
      .catch(() => {
        this.directoryFetchStatus = 'error';
      });
    this.ngbModal.dismissAll();
  }

  getAllDirectories() {
    this.dirSvc.getdirectories().subscribe({
      next: (dir: any) => {
        this.directories = dir;
        this.directoryFetchStatus = 'done'
      },
      error: (_e) => {
        this.directoryFetchStatus = 'error';
      },
    });
  }

  openFormModal(dialogRef: any) {
    let modalRef = this.ngbModal.open(dialogRef, {
      size: 'md',
      centered: true,
    });

    modalRef.dismissed.subscribe({
      next: (_r: any) => {
        this.folderName = '';
        // this.noticeForm.clearValidators()
        console.log('dismissed');
      },
    });
    modalRef.closed.subscribe({
      next: (_r: any) => {
        this.folderName = '';
      },
    });
  }
}
