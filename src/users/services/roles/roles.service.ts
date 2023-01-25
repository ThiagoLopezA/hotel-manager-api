import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from '../../entities/role.entity';
import { CreateRoleDto, UpdateRoleDto } from '../../dtos/roles.dto';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private userRoleRepo: Repository<Role>) {}

  async findAll() {
    return await this.userRoleRepo.find();
  }

  async findOne(params: object) {
    const role = await this.userRoleRepo.findOneBy(params);
    return role;
  }

  async create(payload: CreateRoleDto) {
    return await this.userRoleRepo.save(this.userRoleRepo.create(payload));
  }

  async delete(id: number) {
    return await this.userRoleRepo.delete(id);
  }

  async update(id: number, changes: UpdateRoleDto) {
    const role = await this.findOne({ id });
    this.userRoleRepo.merge(role, changes);
    return this.userRoleRepo.save(role);
  }
}
