import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  async login(@Body() dto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
    const token = await this.authService.login(dto);
    console.log('token', token);
    res.cookie('token', token);
    return 'Вы успешно авторизовались';
  }

  @Post('register')
  async register(@Body() dto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
    const token = await this.authService.register(dto);
    res.cookie('token', token);
    return 'Вы успешно зарегистрировались';
  }
}
