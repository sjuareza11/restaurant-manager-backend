import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { UploaderService } from '@shared/domain/abstract/uplodader-service';
import { FileDto } from '@src/shared/domain/dto/file.dto';

@Injectable()
export class S3UploaderService implements UploaderService {
  AWS_S3_BUCKET = 'restaurant-manager-media';
  s3Client = new S3Client({
    region: 'eu-west-1',
    credentials: {
      accessKeyId: 'AKIATRTD4EFPVQCBJ2PR',
      secretAccessKey: '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',
    },
  });

  uploadFile(file: FileDto) {
    return this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.AWS_S3_BUCKET,
        Key: `clients/${file.fullPath}`,
        Body: file.data,
        ContentType: file.mimetype,
        CacheControl: 'no-cache',
      }),
    );
  }
}
