import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthenService } from './authen.service';
import { LoginDto } from './dto/login.dto';

@Controller()
export class AuthenController {
  constructor(private readonly authenService: AuthenService) {}

  @MessagePattern('login')
  login(@Payload() loginDto: LoginDto) {
    return this.authenService.login(loginDto);
  }
}
