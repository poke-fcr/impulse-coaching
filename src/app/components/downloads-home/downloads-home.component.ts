import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { DirectoriesService } from 'src/app/services/firestore/directories.service';

@Component({
  selector: 'app-downloads-home',
  templateUrl: './downloads-home.component.html',
  styleUrls: ['./downloads-home.component.scss'],
})
export class DownloadsHomeComponent implements OnInit {
  fetchStatus: 'done' | 'fetching' | 'error' = 'fetching';
  dir: any[] = [];

  constructor(private dirSvc: DirectoriesService) {}

  ngOnInit() {
    console.log('on ');
    this.loadData();
  }

  loadData() {
    this.fetchStatus = 'fetching';
    this.dir = [];
    this.dirSvc.getdirectories().subscribe({
      next: (dir: any) => {
        this.dir = dir;
        this.fetchStatus = 'done';
      },
      error: (_e: any) => {
        this.fetchStatus = 'error';
      },
    });
  }
}
