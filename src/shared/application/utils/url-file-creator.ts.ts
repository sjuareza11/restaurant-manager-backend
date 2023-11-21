import { FILE_PATH } from '@src/shared/domain/constants/file-path';
import { UrlFile } from '../../../couriers/domain/models/url-image-file';

export class UrlFileCreator {
  public static createURLFile(urlFile: UrlFile): string {
    const date = new Date();
    return FILE_PATH.replace('{{id}}', urlFile.fileId + date.getTime().toString()).replace(
      '{{storeId}}',
      urlFile.storeId,
    );
  }
}
