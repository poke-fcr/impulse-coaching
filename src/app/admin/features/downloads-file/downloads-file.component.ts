import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs';
import { FileUpload } from 'src/app/model/FileUpload';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-downloads-file',
  templateUrl: './downloads-file.component.html',
  styleUrls: ['./downloads-file.component.scss'],
})
export class DownloadsFileComponent implements OnInit {
  title: string = '';
  id: string = '';
  fetchStatus: 'fetching' | 'done' | 'error' = 'fetching';
  files: any[] = [];

  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;

  fileName: string = '';
  fileType: string | undefined = '';
  previewAvailable: boolean = false;
  downloadAvailable: boolean = false;
  constructor(
    private activateRoute: ActivatedRoute,
    private fileSvc: FileUploadService,
    private ngbModal: NgbModal,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.activateRoute.paramMap.subscribe({
      next: (p: any) => {
        if (p.get('folderName') && p.get('dirId')) {
          this.title = p.get('folderName');
          this.id = p.get('dirId');
          this.loadData();
        } else this.fetchStatus = 'error';
      },
    });
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
        this.fileType = '';
        this.previewAvailable = false;
        this.downloadAvailable = false;
        this.percentage = 0;
        console.log('dismissed');
      },
    });
    modalRef.closed.subscribe({
      next: (_r: any) => {
        this.fileName = '';
        this.fileType = '';
        this.previewAvailable = false;
        this.downloadAvailable = false;
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
      this.fileType = file?.type
      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.fetchStatus = 'fetching';
        let metaData = {
          fileName: this.fileName,
          fileType: this.fileType,
          previewAvailable: this.previewAvailable,
          downloadAvailable: this.downloadAvailable,
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

  downloadFile(d: any) {
    window.open(d.url, '_blank');
    // this.http.get(d.url).subscribe( (data:any) =>{
    //   const blob = new Blob([data]);
    //   const url= window.URL.createObjectURL(blob);
    //   window.open(url);
    // })
    // const xhr = new XMLHttpRequest();
    // xhr.responseType = 'blob';
    // xhr.onload = (event) => {
    //   const blob = xhr.response;
    // };
    // xhr.open('GET', d.url);
    // xhr.send();
    // console.log('rh1')
    // const link = document.createElement('a');
    // link.setAttribute('target', '_blank');
    // link.setAttribute('href', d.url);
    // link.setAttribute('download', `image.jpeg`);
    // document.body.appendChild(link);
    // link.click();
    // link.remove();
    // const link = this.renderer.createElement('a');
    // link.setAttribute('target', '_blank');
    // link.setAttribute('href', 'abc.net/files/test.ino');
    // link.setAttribute('download', `products.csv`);
    // link.click();
    // link.remove();
  }

  previewFile(d: any){

  }
}
