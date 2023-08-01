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
import { FileUploadService } from '../file-upload.service';

@Injectable({
  providedIn: 'root',
})
export class DirectoriesService {
  private firestore: Firestore = inject(Firestore);
  private fs: FileUploadService = inject(FileUploadService);
  private collectionRef = collection(this.firestore, COLLECTIONS.directories);
  // private collectionRef = collection(this.firestore, 'collectionId')

  public directoryLoaded: boolean = false;

  createdirectory(directory: any) {
    let d = doc(this.firestore, this.collectionRef.id, `${directory.directoryId}`);
    return setDoc(d, directory);
  }

  getdirectories() {
    return collectionData(this.collectionRef);
  }

  updatedirectory(updatedData: any, directoryId: string) {
    let docRef = doc(this.firestore, this.collectionRef.id, `${directoryId}`);
    return updateDoc(docRef, updatedData);
  }

  deletedirectory(directoryId: string) {
    let docRef = doc(this.firestore, this.collectionRef.id, `${directoryId}`);
    console.log(docRef)
    // this.fs.deleteFolder(directoryId).subscribe(()=>{
      return deleteDoc(docRef);
    // })
  }
}
