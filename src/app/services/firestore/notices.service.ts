import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  updateDoc,
  doc,
  setDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { COLLECTIONS } from 'src/app/model/Collections';

@Injectable({
  providedIn: 'root',
})
export class NoticesService {
  private firestore: Firestore = inject(Firestore);
  private collectionRef = collection(this.firestore, COLLECTIONS.notices);
  // private collectionRef = collection(this.firestore, 'collectionId')

  public noticeLoaded: boolean = false

  createNotice(notice: any) {
    let d = doc(this.firestore, this.collectionRef.id, `${notice.noticeId}`);
    return setDoc(d, notice);
  }

  getNotices() {
    return collectionData(this.collectionRef);
  }

  updatenotice(updatedData: any, noticeId: string) {
    let docRef = doc(this.firestore, this.collectionRef.id, `${noticeId}`);
    return updateDoc(docRef, updatedData);
  }

  deletenotice(noticeId: string) {
    let docRef = doc(this.firestore, this.collectionRef.id, `${noticeId}`);
    return deleteDoc(docRef);
  }
}
