export abstract class UploaderService {
  abstract uploadFile(file: any): Promise<any>;
}
