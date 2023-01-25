import { Injectable, NotFoundException } from '@nestjs/common';
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
    private roomCategoryRepo: Repository<RoomCategory>,
  ) {}

  async create(payload: CreateRoomCategoryDto) {
    const category = this.roomCategoryRepo.create(payload);
    return await this.roomCategoryRepo.save(category);
  }

  async findAll() {
    return await this.roomCategoryRepo.find();
  }

  async findOne(id: number) {
    const category = await this.roomCategoryRepo.findOneBy({ id });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async update(id: number, changes: UpdateRoomCategoryDto) {
    const category = await this.findOne(id);
    this.roomCategoryRepo.merge(category, changes);
    return this.roomCategoryRepo.save(category);
  }

  async delete(id: number) {
    return await this.roomCategoryRepo.delete(id);
  }
}
