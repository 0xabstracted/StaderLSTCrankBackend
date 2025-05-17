
export interface IUploadFile{
  filename:string,
  fileBuffer:any,
  folder:string
}


export abstract class StorageService{
  abstract uploadFile(params:IUploadFile);
}

