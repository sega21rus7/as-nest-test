import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { DatabaseModule } from './database/database.module';
import { FilesModule } from './files/files.module';
import configuration from './config';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, 'static'),
    }),
    DatabaseModule,
    ProductModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
