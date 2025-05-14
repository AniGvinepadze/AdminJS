import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { adminSchema } from 'src/admin/schema/admin.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports:[
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{name:"admin",schema:adminSchema}]),
    JwtModule.register({
      global:true,
      secret:process.env.JWT_SECRET
    })

  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
