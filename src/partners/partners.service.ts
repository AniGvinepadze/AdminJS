import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Partner } from './schema/partner.schema';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';

@Injectable()
export class PartnersService {
  constructor(
    @InjectModel('partner') private readonly partnerModel: Model<Partner>,private s3Service: AwsS3Service,
  ) {}

  async create(createPartnerDto: CreatePartnerDto) {
    const partner = await this.partnerModel.create(createPartnerDto);
    if (!partner) throw new BadRequestException('partner could not be cretaed');

    return partner;
  }
  uploadImage(filePath, file) {
    return this.s3Service.uploadFile(filePath, file);
  }

  getImage(fileId){
    return this.s3Service.getImageById(fileId)
  }
  deleteImageById(fileId){
    return this.s3Service.deleteImageById(fileId)
  }
  

  findAll() {
    return this.partnerModel.find();
  }

  async findOne(id: string) {
    if (!isValidObjectId)
      throw new BadRequestException('Invalid id is provided');
    const partner = await this.partnerModel.findById(id);
    if (!partner) throw new NotFoundException('partner was not found');
    return partner;
  }

  async update(id: string, updatePartnerDto: UpdatePartnerDto) {
    if (!isValidObjectId)
      throw new BadRequestException('Invalid id is provided');
    const updatedPartner = await this.partnerModel.findByIdAndUpdate(
      id,
      updatePartnerDto,
      { new: true },
    );
    if (!updatedPartner)
      throw new BadRequestException('partner could not be updated');
    return { message: 'partner updated successfully', updatedPartner };
  }

  async remove(id: string) {
    if (!isValidObjectId)
      throw new BadRequestException('Invalid id is provided');
    const deletedPartner = await this.partnerModel.findByIdAndDelete(id);
    if (!deletedPartner)
      throw new BadRequestException('partner could not be deleeted');
    return { message: 'partner deleted successfully', deletedPartner };
  }
}
