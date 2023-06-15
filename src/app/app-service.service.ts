import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  baseUrl: string = 'https://impulse-coaching-firebase-service.onrender.com';
  localHostBaseUrl = 'http://localhost:8080';
  apiEndPoints = {
    saveBatch: `/batch/saveBatch`,
    getBatches: '/batch/getBatches',
    deleteBatch: '/batch/deleteBatch',
  };

  constructor(private http: HttpClient) {}

  saveBatch(batch: any) {
    return this.http.post(
      this.baseUrl + this.apiEndPoints.saveBatch,
      batch
    );
  }

  getBatches() {
   
    return this.http.get(this.baseUrl + this.apiEndPoints.getBatches);
  }

  deleteBatch(batchId: string) {
    return this.http.delete(this.baseUrl + this.apiEndPoints.deleteBatch + '/' + batchId);
  }


}
