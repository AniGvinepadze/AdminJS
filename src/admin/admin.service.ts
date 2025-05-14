import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Admin } from './schema/admin.schema';
import { throwError } from 'rxjs';

@Injectable()
export class AdminService {
  constructor(@InjectModel('admin') private adminModel: Model<Admin>) {}

  findAll() {
    return this.adminModel.find().select('-password');
  }

  async findOne(id: string) {
    if (!isValidObjectId(id))
      throw new BadRequestException('Invalid id format provided');
    const admin = await this.adminModel.findById(id).select('-password');
    if (!admin) throw new BadRequestException('admin was not found');
    return admin;
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    if (!isValidObjectId(id))
      throw new BadRequestException('Invalid id format provided');
    const updateRequest = await this.adminModel.findByIdAndUpdate(
      id,
      updateAdminDto,
      { new: true },
    );
    if (!updateRequest)
      throw new BadRequestException('admin could not be updated');
    return updateRequest;
  }

  async remove(id: string) {
    if (!isValidObjectId(id))
      throw new BadRequestException('Invalid id format provided');

    const deleteAdmin = await this.adminModel.findByIdAndDelete(id);
    if (!deleteAdmin)
      throw new BadRequestException('admin could not be deleted');
    return { message: 'Deleted successfully', deletedAdmin: deleteAdmin };
  }
}
