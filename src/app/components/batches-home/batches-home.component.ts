import { Component, OnInit } from '@angular/core';
import { BatchesService } from 'src/app/services/firestore/batches.service';

@Component({
  selector: 'app-batches-home',
  templateUrl: './batches-home.component.html',
  styleUrls: ['./batches-home.component.scss'],
})
export class BatchesHomeComponent implements OnInit {
  constructor(private batchSvc: BatchesService) {}
  batches: any[] = [];
  batchStatus: 'fetching' | 'done' | 'error' = 'fetching';

  ngOnInit() {
    this.fetchBatches();
  }

  fetchBatches() {
    this.batchStatus = 'fetching';
    this.batches = [];
    this.batchSvc.getBatches().subscribe({
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
