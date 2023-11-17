export class FileUtils {
  public static readonly MAX_FILE_SIZE = 1048576; // 1MB

  public static convertBytesToMBytes(bytes: number): number {
    return bytes / this.MAX_FILE_SIZE;
  }

  public static convertMBytesToBytes(mbytes: number): number {
    return mbytes * this.MAX_FILE_SIZE;
  }

  public static convertDataURIToBinary(dataURI: string): Buffer {
    const base64Data = dataURI.replace(/^data:.*;base64,/, '');
    return Buffer.from(base64Data, 'base64');
  }
}
