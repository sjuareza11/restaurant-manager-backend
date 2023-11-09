export const envAWSConfig = () => ({
  region: process.env.AWS_S3_REGION,
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  s3bucket: process.env.AWS_S3_BUCKET,
  awsS3UploadFilesFolder: process.env.AWS_S3_UPLOAD_FILES_FOLDER,
});
