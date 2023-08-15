import { Injectable } from '@angular/core';
import { PlayerData } from 'src/app/model/PlayerData';

// import { FileUpload } from '../models/file-upload.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  playerData!: PlayerData;
  //   playerData = {
  //     "key": "-Nb6TeG6SBYcFChkiqU9",
  //     "createdOn": 1691268850705,
  //     "downloadAvailable": true,
  //     "fileType": "video",
  //     "mimeType": "video/x-matroska",
  //     "name": "Video File",
  //     "previewAvailable": true,
  //     "url": "https://firebasestorage.googleapis.com/v0/b/impulse-classes-a913f.appspot.com/o/1690912660823%2Fang%201.mkv?alt=media&token=330148e8-8b78-4cc0-b9cd-b1ddd0136671"
  // }
}
