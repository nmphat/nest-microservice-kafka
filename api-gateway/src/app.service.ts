import { CreateUserDto } from './interfaces/users/dto/create-user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('USERS_SERVICE') private readonly userClient: ClientKafka,
  ) {}

  getUser(id: number) {
    console.log('emit findOneUser');
    this.userClient.emit('findOneUser', id).subscribe((user) => {
      console.log('findOneUser', user);

      return user;
    });
  }

  createUser(createUserDto: CreateUserDto) {
    console.log('emit createUser');

    this.userClient.emit('createUser', createUserDto);
  }
}
