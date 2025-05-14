import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from 'src/admin/schema/admin.schema';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from "bcrypt"
@Injectable()
export class AuthService {
    constructor(
        @InjectModel('admin') private readonly adminModel: Model<Admin>,
        private jwtService:JwtService
     ){}

    async signUp({email,fullName,password}:SignUpDto){
        const existUser = await this.adminModel.findOne({email})
        if(existUser) throw new BadRequestException("Admin already exists")

        const hashedPassword = await bcrypt.hash(password,10)

        await this.adminModel.create({email,password:hashedPassword,fullName})

        return "user registered successfully"
    }
    


}
