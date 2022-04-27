import { HttpException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { S3Manager } from 'src/util';
import { CreateImageDto } from './create-imgae.dto';


@Injectable()
export class ImageuploadService {
  constructor(private s3: S3Manager) {}

  async fileUpload( files: Array<Express.Multer.File>, createImgaeDto: CreateImageDto) {
    try {
        if(files.length <1){
            throw new HttpException("이미지가 없습니다.", 400);
        }

        const uploadPromise = files.map(async item => {
            const uuid = randomUUID();
            const result =await this.s3.uploadFile(uuid,item);
            return result;
        })
        
        const result = await Promise.all(uploadPromise);
        return result;
    } catch (e) {
      throw e;
    }
  }

  
}
