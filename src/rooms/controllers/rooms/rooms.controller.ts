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
import {
  CreateRoomCategoryDto,
  UpdateRoomCategoryDto,
} from 'src/rooms/dtos/rooms-categories.dto';

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

  @Post()
  createRoom(@Body() payload: CreateRoomDto) {
    return this.roomsService.create(payload);
  }

  @Get('/categories')
  getCategories() {
    return this.roomsService.findAllCategories();
  }

  @Get('/categories/:id')
  getCategory(@Param('id', ParseIntPipe) id: number) {
    return this.roomsService.findOneCategory(id);
  }

  @Post('/categories')
  createCategory(@Body() payload: CreateRoomCategoryDto) {
    return this.roomsService.createCategory(payload);
  }

  @Put('/categories/:id')
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateRoomCategoryDto,
  ) {
    return this.roomsService.updateCategory(id, payload);
  }

  @Delete('/categories/:id')
  deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.roomsService.deleteCategory(id);
  }

  @Get('/:id')
  getRoom(@Param('id', ParseIntPipe) id: number) {
    return this.roomsService.findOne(id);
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
