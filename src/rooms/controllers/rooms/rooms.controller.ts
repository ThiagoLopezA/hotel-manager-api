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

import { RoomsService } from '../../services/rooms/rooms.service';
import { CreateRoomDto, UpdateRoomDto } from '../../dtos/rooms.dto';
import {
  CreateRoomCategoryDto,
  UpdateRoomCategoryDto,
} from '../../dtos/rooms-categories.dto';
import { ApiResponse } from '../../../common/api/apiResponse';
import { Code } from '../../../common/code/code';

@ApiTags('Rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @Post()
  async createRoom(@Body() payload: CreateRoomDto) {
    const roomAlreadyExists = await this.roomsService.findOneBy({
      number: payload.number,
    });
    if (roomAlreadyExists)
      return ApiResponse.error(
        Code.ENTITY_ALREADY_EXISTS_ERROR.code,
        Code.ENTITY_ALREADY_EXISTS_ERROR.message,
      );
    const newRoom = await this.roomsService.create(payload);
    return ApiResponse.created(newRoom);
  }

  @Post('/categories')
  createCategory(@Body() payload: CreateRoomCategoryDto) {
    return this.roomsService.createCategory(payload);
  }

  @Get()
  async getRooms() {
    const rooms = await this.roomsService.findAll();
    return ApiResponse.success(rooms);
  }

  @Get('/categories')
  async getCategories() {
    return await this.roomsService.findAllCategories();
  }

  @Get('/categories/:id')
  getCategory(@Param('id', ParseIntPipe) id: number) {
    return this.roomsService.findOneCategory(id);
  }

  @Get('/:id')
  async getRoom(@Param('id', ParseIntPipe) id: number) {
    const room = await this.roomsService.findOne(id);
    if (!room)
      return ApiResponse.error(
        Code.NOT_FOUND_ERROR.code,
        Code.NOT_FOUND_ERROR.message,
      );
    return ApiResponse.success(room);
  }

  @Put('/categories/:id')
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateRoomCategoryDto,
  ) {
    return this.roomsService.updateCategory(id, payload);
  }

  @Put('/:id')
  async updateRoom(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateRoomDto,
  ) {
    const room = await this.roomsService.findOne(id);
    if (!room)
      return ApiResponse.error(
        Code.NOT_FOUND_ERROR.code,
        Code.NOT_FOUND_ERROR.message,
      );
    const updatedRoom = await this.roomsService.update(room, payload);
    return ApiResponse.success(updatedRoom);
  }

  @Delete('/categories/:id')
  deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.roomsService.deleteCategory(id);
  }

  @Delete('/:id')
  async deleteRoom(@Param('id', ParseIntPipe) id: number) {
    const room = await this.roomsService.findOne(id);
    if (!room)
      return ApiResponse.error(
        Code.NOT_FOUND_ERROR.code,
        Code.NOT_FOUND_ERROR.message,
      );
    await this.roomsService.delete(id);
    return ApiResponse.success(room);
  }
}
