import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { IMongodb } from 'src/config';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const mongodb: IMongodb = configService.get('mongodb');
        const creds =
          mongodb.username && mongodb.password ?
            mongodb.username +
            ':' +
            mongodb.password +
            '@' :
            '';
        const uri =
          'mongodb://' +
          creds +
          mongodb.host +
          ':' +
          mongodb.port +
          '/' +
          mongodb.dbName;
        console.log('mongodbUrl', uri);

        return { uri };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule { }
