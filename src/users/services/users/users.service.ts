import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserDto } from '../../dtos/users.dto';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  async findAll() {
    return await this.userRepo.find();
  }

  async findOne(params: object) {
    const user = await this.userRepo.findOneBy(params);
    return user;
  }

  async create(payload: CreateUserDto) {
    return await this.userRepo.save(this.userRepo.create(payload));
  }

  async delete(id: number) {
    return await this.userRepo.delete(id);
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.findOne({ id });
    this.userRepo.merge(user, changes);
    return this.userRepo.save(user);
  }
}
