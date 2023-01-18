import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomDto, UpdateRoomDto } from '../../dtos/rooms.dto';
import { Room } from '../../entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(@InjectRepository(Room) private roomsRepo: Repository<Room>) {}

  async findAll(): Promise<Room[]> {
    return await this.roomsRepo.find();
  }

  async findOne(id: number): Promise<Room> {
    const room = await this.roomsRepo.findOneBy({ id });
    if (!room) throw new NotFoundException('Room not found');
    return room;
  }

  async create(payload: CreateRoomDto): Promise<Room> {
    const newRoom = this.roomsRepo.create(payload);
    return await this.roomsRepo.save(newRoom);
  }

  async update(id: number, changes: UpdateRoomDto): Promise<Room> {
    const room = await this.findOne(id);
    this.roomsRepo.merge(room, changes);
    return this.roomsRepo.save(room);
  }

  async delete(id: number): Promise<Room> {
    const room = await this.findOne(id);
    await this.roomsRepo.delete(room.id);
    return room;
  }
}
