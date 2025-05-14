import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from 'src/admin/schema/admin.schema';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel('admin') private readonly adminModel: Model<Admin>,
    private jwtService: JwtService,
  ) {}

  async signUp({ email, fullName, password }: SignUpDto) {
    const existUser = await this.adminModel.findOne({ email });
    if (existUser) throw new BadRequestException('Admin already exists');

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.adminModel.create({ email, password: hashedPassword, fullName });

    return 'user registered successfully';
  }

  async signIn({ email, password }: SignInDto) {
    const existUser = await this.adminModel.findOne({ email });
    if (!existUser)
      throw new BadRequestException('Email or Password is invalid');

    const isPasswordEqual = await bcrypt.compare(password, existUser.password);
    if (!isPasswordEqual)
      throw new BadRequestException('Email or Password is invalid');

    const payLoad = {
      userId: existUser._id,
    };

    const accessToken = await this.jwtService.sign(payLoad, {
      expiresIn: '1h',
    });
    return { accessToken };
  }
}
