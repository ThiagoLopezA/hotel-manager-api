import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateRoomDto, UpdateRoomDto } from '../../dtos/rooms.dto';
import { Room } from '../../entities/room.entity';
import { RoomCategory } from '../../entities/room-category.entity';
import {
  CreateRoomCategoryDto,
  UpdateRoomCategoryDto,
} from '../../dtos/rooms-categories.dto';

@Injectable()
export class RoomsService {
  private rooms: Room[] = [];
  private countId: number = this.rooms.length;

  constructor(
    @InjectRepository(RoomCategory)
    private roomCategoryRepo: Repository<RoomCategory>,
  ) {}

  findAllCategories() {
    return this.roomCategoryRepo.find();
  }

  findOneCategory(id: number) {
    const category = this.roomCategoryRepo.findOneBy({ id });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  createCategory(payload: CreateRoomCategoryDto) {
    const category = this.roomCategoryRepo.create(payload);
    return this.roomCategoryRepo.save(category);
  }

  deleteCategory(id: number) {
    return this.roomCategoryRepo.delete(id);
  }

  async updateCategory(id: number, changes: UpdateRoomCategoryDto) {
    const category = await this.findOneCategory(id);
    this.roomCategoryRepo.merge(category, changes);
    return this.roomCategoryRepo.save(category);
  }

  findAll(): Room[] {
    return this.rooms;
  }

  findOne(id: number): Room {
    const room = this.rooms.find((item) => item.id === id);
    if (!room) throw new NotFoundException('Room not found');
    return room;
  }

  create(payload: CreateRoomDto): Room {
    this.countId += 1;
    const newRoom = {
      id: this.countId,
      ...payload,
    };
    this.rooms.push(newRoom);
    return newRoom;
  }

  update(id: number, payload: UpdateRoomDto): Room {
    const room = this.findOne(id);
    const index = this.rooms.findIndex((item) => item.id === room.id);
    this.rooms[index] = { ...room, ...payload };
    return this.rooms[index];
  }

  delete(id: number): Room {
    const room = this.findOne(id);
    this.rooms = this.rooms.filter((item) => item.id !== room.id);
    return room;
  }
}
