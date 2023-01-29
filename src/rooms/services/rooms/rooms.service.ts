import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Room } from '../../entities/room.entity';
import { Floor } from '../../entities/floor.entity';
import { Category } from '../../entities/category.entity';
import { CreateRoomDto, UpdateRoomDto } from '../../dtos/rooms.dto';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private roomsRepo: Repository<Room>,
    @InjectRepository(Floor) private floorsRepo: Repository<Floor>,
    @InjectRepository(Category) private categoriesRepo: Repository<Category>,
  ) {}

  async create(data: CreateRoomDto): Promise<Room> {
    const newRoom = this.roomsRepo.create(data);
    if (data.floorId) {
      const floor = await this.floorsRepo.findOneBy({ id: data.floorId });
      if (!floor) throw new NotFoundException('Floor not found');
      newRoom.floor = floor;
    }
    if (data.categoryId) {
      const category = await this.categoriesRepo.findOneBy({
        id: data.categoryId,
      });
      if (!category) throw new NotFoundException('Category not found');
      newRoom.category = category;
    }
    return await this.roomsRepo.save(newRoom);
  }

  async findAll(): Promise<Room[]> {
    return await this.roomsRepo.find({ relations: ['floor', 'category'] });
  }

  async findOne(id: number): Promise<Room> {
    const room = await this.roomsRepo.findOne({
      where: { id },
      relations: ['floor', 'category'],
    });
    return room;
  }

  async findOneBy(key: UpdateRoomDto): Promise<Room> {
    const room = await this.roomsRepo.findOne({
      where: key,
      relations: ['floor', 'category'],
    });
    return room;
  }

  async update(room: Room, changes: UpdateRoomDto): Promise<Room> {
    if (changes.number) {
      const roomAlreadyExits = await this.roomsRepo.findOne({
        where: {
          number: changes.number,
        },
      });
      if (roomAlreadyExits)
        throw new ConflictException(`Room #${changes.number} already exits`);
    }
    if (changes.floorId) {
      const floor = await this.floorsRepo.findOneBy({ id: changes.floorId });
      if (!floor) throw new NotFoundException('Floor not found');
      room.floor = floor;
    }
    if (changes.categoryId) {
      const category = await this.categoriesRepo.findOneBy({
        id: changes.categoryId,
      });
      if (!category) throw new NotFoundException('Category not found');
      room.category = category;
    }
    this.roomsRepo.merge(room, changes);
    return this.roomsRepo.save(room);
  }

  async delete(id: number) {
    return await this.roomsRepo.delete(id);
  }
}
