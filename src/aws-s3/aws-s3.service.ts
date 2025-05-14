import { Body, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Readable } from 'stream';

@Injectable()
export class AwsS3Service {
  private storageService;
  private bucketName;

  constructor(private readonly config: ConfigService) {
    this.bucketName = this.config.get<string>('AWS_BUCKET_NAME')!;
    this.storageService = new S3Client({
      region: this.config.get<string>('AWS_REGION')!,
      credentials: {
        accessKeyId: this.config.get<string>('AWS_ACCESS_KEY')!,
        secretAccessKey: this.config.get<string>('AWS_SECRET_ACCESS_KEY')!,
      },
    });
  }

  async uploadFile(filePath: string, file) {
    if (!filePath) return;

    const config = {
      Key: filePath,
      Bucket: this.bucketName,
      Body: file.buffer,
    };

    const command = new PutObjectCommand(config);
    await this.storageService.send(command);

    return filePath;
  }

  async getImageById(filePath) {
    if (!filePath) return;

    const config = {
      Bucket: this.bucketName,
      Key: filePath,
    };
    const command = new GetObjectCommand(config);
    const fileStream = await this.storageService.send(command);
    const chunks = [];

    if (fileStream.Body instanceof Readable) {
      for await (let stream of fileStream.Body) {
        chunks.push(stream);
      }
      const fileBuffer = Buffer.concat(chunks);
      const b64 = fileBuffer.toString('base64');
      const file = `data:${fileStream.ContentType};base64,${b64}`;
      return file;
    }
  }
  async deleteImageById(fileId) {
    if (!fileId) return;
    const config = {
      Key: fileId,
      Bucket: this.bucketName,
    };
    const command = new DeleteObjectCommand(config)
    await this.storageService.send(command)

    return fileId
  }
}
