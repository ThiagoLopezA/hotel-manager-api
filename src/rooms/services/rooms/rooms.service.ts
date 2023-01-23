import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomDto, UpdateRoomDto } from '../../dtos/rooms.dto';
import { Room } from '../../entities/room.entity';
import { Floor } from '../../entities/floor.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private roomsRepo: Repository<Room>,
    @InjectRepository(Floor) private floorsRepo: Repository<Floor>,
  ) {}

  async findAll(): Promise<Room[]> {
    return await this.roomsRepo.find({
      relations: ['floor'],
    });
  }

  async findOne(id: number): Promise<Room> {
    const room = await this.roomsRepo.findOne({
      where: { id },
      relations: ['floor'],
    });
    if (!room) throw new NotFoundException('Room not found');
    return room;
  }

  async create(data: CreateRoomDto): Promise<Room> {
    const newRoom = this.roomsRepo.create(data);
    if (data.floorId) {
      const floor = await this.floorsRepo.findOneBy({ id: data.floorId });
      if (!floor) throw new NotFoundException('Floor not found');
      newRoom.floor = floor;
    }
    return await this.roomsRepo.save(newRoom);
  }

  async update(id: number, changes: UpdateRoomDto): Promise<Room> {
    const room = await this.findOne(id);
    if (changes.floorId) {
      const floor = await this.floorsRepo.findOneBy({ id: changes.floorId });
      if (!floor) throw new NotFoundException('Floor not found');
      room.floor = floor;
    }
    this.roomsRepo.merge(room, changes);
    return this.roomsRepo.save(room);
  }

  async delete(id: number): Promise<Room> {
    const room = await this.findOne(id);
    await this.roomsRepo.delete(room.id);
    return room;
  }
}
