import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { CreateImageDto } from './create-imgae.dto';
import { ImageuploadService } from './imageupload.service';

@Controller('image')
export class ImageuploadController {
  constructor(private imageUploadService: ImageuploadService) {}

  @UseInterceptors(FilesInterceptor('files', 10))
  @Post()
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createImgaeDto: CreateImageDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.imageUploadService.fileUpload(
        files,
        createImgaeDto,
      );
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'success',
        data: result,
      });
    } catch (e) {
      console.log(e);
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: e.message,
      });
    }
  }
}
