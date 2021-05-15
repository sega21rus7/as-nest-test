import { HttpModule, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    HttpModule,
    ClientsModule.register([
      { name: 'AUTH_SERVICE', transport: Transport.TCP },
    ]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule { }
