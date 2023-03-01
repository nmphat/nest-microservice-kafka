import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
  ) {}

  userList: User[] = [
    {
      id: 1,
      name: 'Phat1',
      phone: '0123',
      email: 'phat@email.ngo',
    },
    {
      id: 2,
      name: 'Phat2',
      phone: '0123',
      email: 'phat@email.ngo',
    },
    {
      id: 3,
      name: 'Phat3',
      phone: '0123',
      email: 'phat@email.ngo',
    },
  ];

  create({ id, name, phone, email }: CreateUserDto) {
    this.userList.push({ id, phone, name, email });
    return { id, phone, name, email };
  }

  findAll() {
    return this.userList;
  }

  findOne(id: number) {
    this.authClient
      .send('login', {
        username: 'phat',
        password: '123',
      })
      .subscribe((data) => {
        console.log(data);

        if (data.status === 'success') {
          return this.userList;
        }
      });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
