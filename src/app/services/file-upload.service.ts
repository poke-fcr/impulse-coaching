import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from '../model/FileUpload';
// import { FileUpload } from '../models/file-upload.model';

@Injectable({
  providedIn: 'root',
})

export class FileUploadService {
  private basePath = '/gallery-uploads';

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {}

  pushFileToStorage(basePath: string, fileUpload: FileUpload | any, metaData: any): Observable<number | undefined> {
    const filePath = `${basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    console.log(fileUpload)
    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            fileUpload.url = downloadURL;
            fileUpload.name = metaData.fileName
            fileUpload.fileType = metaData.fileType
            fileUpload.previewAvailable = metaData.previewAvailable
            fileUpload.downloadAvailable = metaData.downloadAvailable


            fileUpload.createdOn = new Date().getTime()
           //edit file upload!
 // fileUpload['title'] = 'Test title',
            // fileUpload.description = 'Test description'
            this.saveFileData(basePath, fileUpload);
          });
        })
      )
      .subscribe();

    return uploadTask.percentageChanges();
  }

  private saveFileData(basePath: string, fileUpload: FileUpload): void {
   this.db.list(basePath).push(fileUpload);
  }

  getFiles(basePath: string): AngularFireList<FileUpload> {
    // console.log('rh 2', this.db.database.)
    console.log(this.db.list(basePath))
    return this.db.list(basePath);
    
  }

  deleteFile(basePath: string, fileUpload: FileUpload) {
    return  this.deleteFileDatabase(basePath, fileUpload.key)
      .then(() => {
        this.deleteFileStorage(basePath, fileUpload.name);
      })
      .catch((error) => console.log(error));
  }

  private deleteFileDatabase(basePath: string, key: string): Promise<void> {
    return this.db.list(basePath).remove(key);
  }

  deleteFolder(basePath: string){
    console.log('rh1')
    const storageRef = this.storage.ref(basePath);
    return storageRef.delete()
  }

  private deleteFileStorage(basePath: string, name: string): void {
    const storageRef = this.storage.ref(basePath);
     storageRef.child(name).delete();
  }
}
