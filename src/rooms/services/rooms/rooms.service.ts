import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Room } from '../../entities/room.entity';
import { RoomCategory } from '../../entities/room-category.entity';
import { Floor } from '../../entities/floor.entity';
import { CreateRoomDto, UpdateRoomDto } from '../../dtos/rooms.dto';
import {
  CreateRoomCategoryDto,
  UpdateRoomCategoryDto,
} from '../../dtos/rooms-categories.dto';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private roomsRepo: Repository<Room>,
    @InjectRepository(Floor) private floorsRepo: Repository<Floor>,
    @InjectRepository(RoomCategory)
    private roomCategoryRepo: Repository<RoomCategory>,
  ) {}

  async create(data: CreateRoomDto): Promise<Room> {
    const newRoom = this.roomsRepo.create(data);
    if (data.floorId) {
      const floor = await this.floorsRepo.findOneBy({ id: data.floorId });
      if (!floor) throw new NotFoundException('Floor not found');
      newRoom.floor = floor;
    }
    return await this.roomsRepo.save(newRoom);
  }

  async findAll(): Promise<Room[]> {
    return await this.roomsRepo.find({ relations: ['floor'] });
  }

  async findOne(id: number): Promise<Room> {
    const room = await this.roomsRepo.findOne({
      where: { id },
      relations: ['floor'],
    });
    return room;
  }

  async findOneBy(key: UpdateRoomDto): Promise<Room> {
    const room = await this.roomsRepo.findOne({
      where: key,
      relations: ['floor'],
    });
    return room;
  }

  async update(room: Room, changes: UpdateRoomDto): Promise<Room> {
    if (changes.floorId) {
      const floor = await this.floorsRepo.findOneBy({ id: changes.floorId });
      if (!floor) throw new NotFoundException('Floor not found');
      room.floor = floor;
    }
    this.roomsRepo.merge(room, changes);
    return this.roomsRepo.save(room);
  }

  async delete(id: number) {
    return await this.roomsRepo.delete(id);
  }

  // _____ROOM_CATEGORY:
  async createCategory(payload: CreateRoomCategoryDto) {
    const category = this.roomCategoryRepo.create(payload);
    return await this.roomCategoryRepo.save(category);
  }

  async findAllCategories() {
    return await this.roomCategoryRepo.find();
  }

  async findOneCategory(id: number) {
    const category = await this.roomCategoryRepo.findOneBy({ id });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async updateCategory(id: number, changes: UpdateRoomCategoryDto) {
    const category = await this.findOneCategory(id);
    this.roomCategoryRepo.merge(category, changes);
    return this.roomCategoryRepo.save(category);
  }

  async deleteCategory(id: number) {
    return await this.roomCategoryRepo.delete(id);
  }
}
