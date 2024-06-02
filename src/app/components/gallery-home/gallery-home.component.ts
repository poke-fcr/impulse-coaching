import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { PlayerService } from 'src/app/services/player/player.service';

@Component({
  selector: 'app-gallery-home',
  templateUrl: './gallery-home.component.html',
  styleUrls: ['./gallery-home.component.scss'],
})
export class GalleryHomeComponent implements OnInit {
  
  title: string = '';
  id: string = '';
  fetchStatus: 'fetching' | 'done' | 'error' = 'fetching';
  files: any[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private fileSvc: FileUploadService,
    private router: Router,
    private playerSvc: PlayerService
  ) {}

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
          this.files = fileUploads.reverse();
          this.fetchStatus = 'done';
        },
        (_e) => {
          this.fetchStatus = 'error';
        }
      );
  }

  downloadFile(d: any) {
    window.open(d.url, '_blank');
  }

  previewFile(d: any) {
    this.playerSvc.playerData = d
    if(d.fileType == 'video')
    this.router.navigate(['player/video'])
    else if(d.fileType == 'pdf')
    this.router.navigate(['player/pdf'])
    else 
    alert('Funcionality for pdf player under development')
  }
}
