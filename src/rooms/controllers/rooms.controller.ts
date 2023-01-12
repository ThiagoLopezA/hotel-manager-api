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
  createRoom(@Body() payload: any) {
    return {
      message: 'Room created',
      room: payload,
    };
  }

  @Put('/:id')
  updateRoom(@Param('id', ParseIntPipe) id: number, @Body() payload: any) {
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
