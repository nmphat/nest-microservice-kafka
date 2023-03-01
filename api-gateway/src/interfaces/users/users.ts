import { Injectable } from '@nestjs/common';

@Injectable()
export class Users {
  id: number;
  name: string;
  phone: string;
  email: string;
}
