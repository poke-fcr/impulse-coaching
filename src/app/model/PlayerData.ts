export class PlayerData {
  name!: string;
  url!: string;
  createdOn!: number;
  fileType: string | undefined = '';
  mimeType: string | undefined = '';
  previewAvailable: boolean = false;
  downloadAvailable: boolean = false;
}
