import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  // baseUrl: string = 'https://impulse-coaching-firebase-service.onrender.com';
  // // baseUrl: string = 'http://localhost:8080';

  // appFirstTimeLoad = true
 
  // apiEndPoints = {
  //   saveBatch: `/batch/saveBatch`,
  //   getBatches: '/batch/getBatches',
  //   deleteBatch: '/batch/deleteBatch',

  //   saveNotice: `/notice/saveNotice`,
  //   getNotices: '/notice/getNotices',
  //   deleteNotice: '/notice/deleteNotice',

    
  // };

  // constructor(private http: HttpClient) {}

  // saveBatch(batch: any) {
  //   return this.http.post(
  //     this.baseUrl + this.apiEndPoints.saveBatch,
  //     batch
  //   );
  // }

  // getBatches() {
   
  //   return this.http.get(this.baseUrl + this.apiEndPoints.getBatches);
  // }

  // deleteBatch(batchId: string) {
  //   return this.http.delete(this.baseUrl + this.apiEndPoints.deleteBatch + '/' + batchId);
  // }

  // saveNotice(notice: any) {
  //   return this.http.post(
  //     this.baseUrl + this.apiEndPoints.saveNotice,
  //     notice
  //   );
  // }

  // getNotices() {
   
  //   return this.http.get(this.baseUrl + this.apiEndPoints.getNotices);
  // }

  // deleteNotice(noticeId: string) {
  //   return this.http.delete(this.baseUrl + this.apiEndPoints.deleteNotice + '/' + noticeId);
  // }


}
