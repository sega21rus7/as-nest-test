import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const creds =
          configService.get<string>('mongodb_username') &&
            configService.get<string>('mongodb_password') ?
            configService.get<string>('mongodb_username') +
            ':' +
            configService.get<string>('mongodb_password') +
            '@' :
            '';
        const uri =
          'mongodb://' +
          creds +
          configService.get<string>('mongodb_host') +
          ':' +
          configService.get<string>('mongodb_port') +
          '/' +
          configService.get<string>('mongodb_dbName');
        console.log('mongodbUrl', uri);

        return { uri };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule { }
