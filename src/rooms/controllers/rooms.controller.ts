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
import { CreateRoomDto, UpdateRoomDto } from '../dtos/rooms.dto';

@ApiTags('Rooms')
@Controller('rooms')
export class RoomsController {
  @Get()
  getRooms() {
    return {
      message: 'All rooms',
    };
  }

  @Get('/:id')
  getRoom(@Param('id', ParseIntPipe) id: number) {
    return {
      message: `Room #${id}`,
    };
  }

  @Post()
  createRoom(@Body() payload: CreateRoomDto) {
    return {
      message: 'Room created',
      room: payload,
    };
  }

  @Put('/:id')
  updateRoom(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateRoomDto,
  ) {
    return {
      message: `Room #${id} updated`,
      updatedRoom: payload,
    };
  }

  @Delete('/:id')
  deleteRoom(@Param('id', ParseIntPipe) id: number) {
    return {
      message: `Room #${id} deleted`,
    };
  }
}
