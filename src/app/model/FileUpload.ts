export class FileUpload {
    key!: string;
    name!: string;
    url!: string;
    file: File;
    createdOn!: number;
    fileType: string | undefined = '';
    previewAvailable: boolean = false;
    downloadAvailable: boolean = false;
  
    constructor(file: File) {
      this.file = file;
    }
  }