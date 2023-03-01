import { CreateUserDto } from './interfaces/users/dto/create-user.dto';
import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  OnModuleInit,
  Inject,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka } from '@nestjs/microservices';

@Controller()
export class AppController implements OnModuleInit {
  constructor(
    private readonly appService: AppService,
    @Inject('USERS_SERVICE') private readonly userClient: ClientKafka,
  ) {}
  async onModuleInit() {
    this.userClient.subscribeToResponseOf('findOneUser');
    await this.userClient.connect();
  }

  @Get()
  getUser() {
    this.appService.getUser(1);

    return 'success';
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    console.log('POST', createUserDto);

    this.appService.createUser(createUserDto);
  }
}
