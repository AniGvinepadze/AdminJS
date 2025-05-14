import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { AboutUsModule } from './about-us/about-us.module';
import { FeedbackModule } from './feedback/feedback.module';
import { BlogsModule } from './blogs/blogs.module';
import { FaqModule } from './faq/faq.module';
import { PartnersModule } from './partners/partners.module';
import { AwsS3Module } from './aws-s3/aws-s3.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
      }),
      inject: [ConfigService],
    }),
    AdminModule,
    AuthModule,
    CoursesModule,
    AboutUsModule,
    FeedbackModule,
    BlogsModule,
    FaqModule,
    PartnersModule,
    AwsS3Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
