import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UploaderService } from '@shared/domain/abstract/uplodader-service';
import { EnviromentConfiguration } from '@src/config/domain/environment-configuration';
import { FileDto } from '@src/shared/domain/dto/file.dto';

@Injectable()
export class S3UploaderService implements UploaderService {
  constructor(
    private readonly configService: ConfigService<EnviromentConfiguration>,
  ) {}
  AWS_S3_BUCKET = this.configService.get('awsConfig').s3bucket;
  s3Client = new S3Client({
    region: this.configService.get('awsConfig').region,
    credentials: {
      accessKeyId: this.configService.get('awsConfig').accessKeyId,
      secretAccessKey: this.configService.get('awsConfig').secretAccessKey,
    },
  });

  uploadFile(file: FileDto) {
    return this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.AWS_S3_BUCKET,
        Key: `${this.configService.get('awsConfig').awsS3UploadFilesFolder}/${
          file.fullPath
        }`,
        Body: file.data,
        ContentType: file.mimetype,
        CacheControl: 'no-cache',
      }),
    );
  }
}
