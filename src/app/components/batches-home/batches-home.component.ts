import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app-service.service';

@Component({
  selector: 'app-batches-home',
  templateUrl: './batches-home.component.html',
  styleUrls: ['./batches-home.component.scss'],
})
export class BatchesHomeComponent implements OnInit {
  constructor(private appSvc: AppService) {}
  batches: any[] = [];
  batchStatus: 'fetching' | 'done' | 'error' = 'fetching';

  ngOnInit() {
    this.fetchBatches();
  }

  fetchBatches() {
    this.batchStatus = 'fetching';
    this.batches = [];
    this.appSvc.getBatches().subscribe({
      next: (data: any) => {
        if (typeof data === 'object') {
          this.batches = data;
          this.batchStatus = 'done';
        } else {
          this.batchStatus = 'error';
        }
      },
      error: (_err) => {
        this.batchStatus = 'error';
      },
    });
  }

  
}
