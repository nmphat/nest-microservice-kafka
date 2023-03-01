import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthenService {
  login(loginDto: LoginDto) {
    if (loginDto.username === 'phat' && loginDto.password === '123') {
      return {
        status: 'success',
        msg: 'login success',
      };
    } else {
      return {
        status: 'fail',
        msg: 'login fail',
      };
    }
  }
}
