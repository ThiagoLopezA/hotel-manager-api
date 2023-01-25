import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserRole } from '../../entities/user-role.entity';
import {
  CreateUserRoleDto,
  UpdateUserRoleDto,
} from '../../dtos/user-roles.dto';

@Injectable()
export class UserRolesService {
  constructor(
    @InjectRepository(UserRole) private userRoleRepo: Repository<UserRole>,
  ) {}

  async findAll() {
    return await this.userRoleRepo.find();
  }

  async findOne(params: object) {
    const userRole = await this.userRoleRepo.findOneBy(params);
    return userRole;
  }

  async create(payload: CreateUserRoleDto) {
    return await this.userRoleRepo.save(this.userRoleRepo.create(payload));
  }

  async delete(id: number) {
    return await this.userRoleRepo.delete(id);
  }

  async update(id: number, changes: UpdateUserRoleDto) {
    const userRole = await this.findOne({ id });
    this.userRoleRepo.merge(userRole, changes);
    return this.userRoleRepo.save(userRole);
  }
}
