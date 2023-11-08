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
  }
}
