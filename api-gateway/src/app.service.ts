import { CreateUserDto } from './interfaces/users/dto/create-user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('USERS_SERVICE') private readonly userClient: ClientKafka,
  ) {}

  async getUser(id: number) {
    console.log('emit findOneUser');
    const findOneUserResponse = await firstValueFrom(
      this.userClient.send('findOneUser', id),
    );
    console.log('findOneUserResponse', findOneUserResponse);

    return findOneUserResponse;
  }

  createUser(createUserDto: CreateUserDto) {
    console.log('emit createUser');

    this.userClient.emit('createUser', createUserDto);
  }
}
