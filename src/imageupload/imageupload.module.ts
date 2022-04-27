import { Module } from '@nestjs/common';
import { S3Manager } from 'src/util';
import { ImageuploadController } from './imageupload.controller';
import { ImageuploadService } from './imageupload.service';

@Module({
  controllers: [ImageuploadController],
  providers: [
    ImageuploadService,
    {
      provide: S3Manager,
      useFactory: () =>
        new S3Manager({
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_KEY_ID,
          region: process.env.AWS_REGION,
          bucket: process.env.AWS_S3_BUCKET_NAME,
        }),
    },
  ],
})
export class ImageuploadModule {}
