import { COURIER_FILE_PATH } from '@src/couriers/domain/constants/courier-files-path';
import { UrlUtils } from '@src/shared/domain/utils/url.utils';
import { UrlImageFile } from '../../domain/models/url-image-file';

export class CourierUrlFileCreator {
  public static createImageURL(urlImageFile: UrlImageFile): string {
    return COURIER_FILE_PATH.replace('{{id}}', urlImageFile.fileId)
      .replace('{{storeId}}', urlImageFile.storeId)
      .replace(
        '{{filename}}',
        UrlUtils.normalizeUrlName(urlImageFile.fileName),
      );
  }
}
