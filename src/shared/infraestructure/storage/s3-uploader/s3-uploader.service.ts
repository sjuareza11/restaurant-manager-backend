import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { UploaderService } from '@shared/domain/abstract/uplodader-service';

@Injectable()
export class S3UploaderService implements UploaderService {
  AWS_S3_BUCKET = 'restaurant-manager-media';
  s3Client = new S3Client({
    region: 'eu-west-1',
    credentials: {
      accessKeyId: 'AKIATRTD4EFP5AVV67X6',
      secretAccessKey: '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',
    },
  });

  uploadFile(file) {
    return this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.AWS_S3_BUCKET,
        Key: `pruebas/${file.name}`,
        Body: file.data,
        ContentType: file.mimetype,
      }),
    );
  }
}
