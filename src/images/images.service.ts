import { Injectable, NotFoundException } from '@nestjs/common';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Image } from './schema/image.schema';
import { Types } from 'mongoose';
import { Course } from 'src/courses/schema/course.schema';
import { UpdateImageDto } from './dto/update-image.dto';

@Injectable()
export class ImagesService {
  constructor(
    private readonly s3Service: AwsS3Service,
    @InjectModel('image') private imageModel: Model<Image>,
    @InjectModel('course') private courseModel: Model<Course>,
  ) {}
  async uploadImage(
    filePath: string,
    file: Express.Multer.File,
    courseId?: string,
    partnerId?: string,
  ) {
    await this.s3Service.uploadFile(filePath, file);
    const type = file.mimetype.split('/')[1];
    console.log(file.mimetype.split);

    const imageData: Partial<Image> = {
      s3Key: `${filePath}.${type}`,
      mimetype: file.mimetype,
      size: file.size,
    };

    if (courseId) {
      imageData.course = new Types.ObjectId(courseId);
    }

    if (partnerId) {
      imageData.partner = new Types.ObjectId(partnerId);
    }

    const savedImage = await this.imageModel.create(imageData);
    if (courseId) {
      await this.courseModel.findByIdAndUpdate(courseId, {
        $push: { images: savedImage._id },
      });
    }

    return savedImage;
  }

  async getImage(fileId: string) {
    const image = await this.imageModel.findOne({ s3Key: fileId });

    if (!image) return null;

    return this.s3Service.getImageById(image.s3Key);
  }
  //   async updateImage(
  //   imageId: string,
  //   updateData: UpdateImageDto,
  // ) {

  //   if (updateData.course) {
  //     updateData.course = new Types.ObjectId(updateData.course);
  //   }
  //   if (updateData.partner) {
  //     updateData.partner = new Types.ObjectId(updateData.partner);
  //   }

  //   const updatedImage = await this.imageModel.findByIdAndUpdate(
  //     imageId,
  //     updateData,
  //     { new: true },
  //   );

  //   if (!updatedImage) {
  //     throw new NotFoundException(`Image with ID ${imageId} not found`);
  //   }

  //   return updatedImage;
  // }

  async deleteImageById(fileId: string) {
    const image = await this.imageModel.findById(fileId).exec();
    if (!image) return null;

    await this.s3Service.deleteImageById(image.s3Key);
    await this.imageModel.findByIdAndDelete(fileId).exec();

    return { deleted: true, id: fileId };
  }
}
