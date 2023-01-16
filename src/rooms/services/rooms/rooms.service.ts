import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto, UpdateRoomDto } from '../../dtos/rooms.dto';
import { Room } from '../../entities/room.entity';

@Injectable()
export class RoomsService {
  private rooms: Room[] = [];
  private countId: number = this.rooms.length;

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
