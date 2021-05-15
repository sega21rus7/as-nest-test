import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { timeout } from 'rxjs/operators';

enum IAuthEvent {
  login = 'login',
  register = 'register'
}

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private authServiceClient: ClientProxy
  ) { }

  private async getTokenFromAuthService(event: IAuthEvent, dto: CreateUserDto) {
    try {
      const res = await this.authServiceClient
        .send(event, dto)
        .pipe(timeout(5000))
        .toPromise();
      return res;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(dto: CreateUserDto) {
    return this.getTokenFromAuthService(IAuthEvent.login, dto);

  }
  async register(dto: CreateUserDto) {
    return this.getTokenFromAuthService(IAuthEvent.register, dto);
  }
}
