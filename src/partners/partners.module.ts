import { Module } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { PartnersController } from './partners.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { partnerSchema } from './schema/partner.schema';

@Module({
  imports:[
      MongooseModule.forFeature([{name:"partner",schema:partnerSchema}])
  ],
  controllers: [PartnersController],
  providers: [PartnersService],
})
export class PartnersModule {}
