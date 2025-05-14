import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { blogSchema } from './schema/blog.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name:"blog",schema:blogSchema}])
  ],
  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BlogsModule {}
