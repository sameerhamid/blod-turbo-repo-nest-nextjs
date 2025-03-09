import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(createUserInput: CreateUserInput) {
    const hashedPass = await hash(createUserInput.password);
    createUserInput.password = hashedPass;
    return await this.prisma.user.create({
      data: createUserInput,
    });
  }
}
