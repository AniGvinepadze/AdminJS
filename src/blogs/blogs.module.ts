import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { blogSchema } from './schema/blog.schema';
import { AwsS3Module } from 'src/aws-s3/aws-s3.module';

@Module({
  imports:[
    MongooseModule.forFeature([{name:"blog",schema:blogSchema}]),
    AwsS3Module
  ],
  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BlogsModule {}
