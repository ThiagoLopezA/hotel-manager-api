import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RoomCategory } from '../../entities/room-category.entity';
import {
  CreateRoomCategoryDto,
  UpdateRoomCategoryDto,
} from '../../dtos/rooms-categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(RoomCategory)
    private categoriesRepo: Repository<RoomCategory>,
  ) {}

  async create(payload: CreateRoomCategoryDto) {
    const newCategory = this.categoriesRepo.create(payload);
    return await this.categoriesRepo.save(newCategory);
  }

  async findAll() {
    return await this.categoriesRepo.find();
  }

  async findOne(id: number) {
    return await this.categoriesRepo.findOneBy({ id });
  }

  async findOneBy(key: UpdateRoomCategoryDto) {
    return await this.categoriesRepo.findOneBy(key);
  }

  async update(id: number, changes: UpdateRoomCategoryDto) {
    const category = await this.findOne(id);
    this.categoriesRepo.merge(category, changes);
    return this.categoriesRepo.save(category);
  }

  async delete(id: number) {
    return await this.categoriesRepo.delete(id);
  }
}
