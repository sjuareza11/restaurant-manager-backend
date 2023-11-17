import { FileUtils } from '@src/shared/utils/file.utils';
import { UrlUtils } from '../utils/url.utils';

export class FileDto {
  readonly name: string;
  readonly data: Buffer;
  readonly size: number;
  readonly mimetype: string;
  readonly fullPath: string;

  constructor(file: Partial<FileDto>) {
    Object.assign(this, file);
    this.name = UrlUtils.normalizeUrlName(this.name);
    this.data = file.data instanceof Buffer ? file.data : FileUtils.convertDataURIToBinary(file.data);
  }
}
