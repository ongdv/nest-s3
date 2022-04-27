import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ImageuploadModule } from './imageupload/imageupload.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ImageuploadModule],
})
export class AppModule {}
