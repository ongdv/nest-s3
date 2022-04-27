import * as AWS from 'aws-sdk';
import { randomUUID } from 'crypto';

export class S3Manager {
  private s3: AWS.S3;
  private bucket: string;

  constructor(params: {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
    bucket: string;
  }) {
    if (this.s3) {
      return;
    }
    this.bucket = params.bucket;

    this.s3 = new AWS.S3({region: params.region,
      credentials: {
        accessKeyId: params.accessKeyId,
        secretAccessKey: params.secretAccessKey
      }});
  }

  /**
   * S3 파일 업로드
   * --
   * @param {string} folderName 저장할 폴더
   * @param {Express.Multer.File} file 파일
   * @returns
   */
  async uploadFile(folderName: string=undefined, file: Express.Multer.File) {
    const uuid = randomUUID();
    const params = {
      Bucket: this.bucket,
      Body: file.buffer,
      ContentType: file.mimetype,
      Key: folderName ? `${folderName}/${uuid}` : uuid,
    };
    const result = await this.s3.upload(params).promise().then();
    return result;
  }

  /**
   * --
   * @param {string} folderName
   * @param {Express.Multer.File}file
   */
  async multiUploadFile(folderName: string, file: Express.Multer.File[]) {}
}
