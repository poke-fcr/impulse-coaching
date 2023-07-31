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
export class BatchesService {
  private firestore: Firestore = inject(Firestore);
  private collectionRef = collection(this.firestore, COLLECTIONS.batches);
  // private collectionRef = collection(this.firestore, 'collectionId')

  createBatch(batch: any) {
    let d = doc(this.firestore, this.collectionRef.id, `${batch.batchId}`);
    return setDoc(d, batch);
  }

  getBatches() {
    return collectionData(this.collectionRef);
  }

  updateBatch(updatedData: any, batchId: string) {
    let docRef = doc(this.firestore, this.collectionRef.id, `${batchId}`);
    return updateDoc(docRef, updatedData);
  }

  deleteBatch(batchId: string) {
    let docRef = doc(this.firestore, this.collectionRef.id, `${batchId}`);
    return deleteDoc(docRef);
  }
}
