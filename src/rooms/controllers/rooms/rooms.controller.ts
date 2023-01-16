import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateRoomDto, UpdateRoomDto } from '../../dtos/rooms.dto';
import { RoomsService } from '../../services/rooms/rooms.service';

@ApiTags('Rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @Get()
  getRooms() {
    return this.roomsService.findAll();
  }

  @Get('/:id')
  getRoom(@Param('id', ParseIntPipe) id: number) {
    return this.roomsService.findOne(id);
  }

  @Post()
  createRoom(@Body() payload: CreateRoomDto) {
    return this.roomsService.create(payload);
  }

  @Put('/:id')
  updateRoom(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateRoomDto,
  ) {
    return this.roomsService.update(id, payload);
  }

  @Delete('/:id')
  deleteRoom(@Param('id', ParseIntPipe) id: number) {
    return this.roomsService.delete(id);
  }
}
