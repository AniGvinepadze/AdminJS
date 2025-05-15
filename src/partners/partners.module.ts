import { Module } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { PartnersController } from './partners.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { partnerSchema } from './schema/partner.schema';
import { AwsS3Module } from 'src/aws-s3/aws-s3.module';

@Module({
  imports:[
      MongooseModule.forFeature([{name:"partner",schema:partnerSchema}]),
      AwsS3Module
  ],
  controllers: [PartnersController],
  providers: [PartnersService],
})
export class PartnersModule {}
