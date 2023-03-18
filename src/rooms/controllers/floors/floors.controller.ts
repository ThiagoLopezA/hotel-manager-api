import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateFloorDto, UpdateFloorDto } from '../../dtos/floors.dto';
import { FloorsService } from '../../services/floors/floors.service';
import { ApiResponse, Code } from '../../../common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Floors')
@UseGuards(JwtAuthGuard)
@Controller('floors')
export class FloorsController {
  constructor(private floorsService: FloorsService) {}

  @Get()
  async findAll() {
    const floors = await this.floorsService.findAll();
    return ApiResponse.success(floors);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const floor = await this.floorsService.findOne({ id });
    if (!floor)
      return ApiResponse.error(
        Code.NOT_FOUND_ERROR.code,
        Code.NOT_FOUND_ERROR.message,
      );
    return ApiResponse.success(floor);
  }

  // @Get(':id/rooms')

  @Post()
  async create(@Body() body: CreateFloorDto) {
    const floor = await this.floorsService.findOne({ number: body.number });
    if (floor)
      return ApiResponse.error(
        Code.ENTITY_ALREADY_EXISTS_ERROR.code,
        Code.ENTITY_ALREADY_EXISTS_ERROR.message,
      );
    const newFloor = await this.floorsService.create(body);
    return ApiResponse.created(newFloor);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const floor = await this.floorsService.findOne({ id });
    if (!floor)
      return ApiResponse.error(
        Code.NOT_FOUND_ERROR.code,
        Code.NOT_FOUND_ERROR.message,
      );
    await this.floorsService.delete(id);
    return ApiResponse.success();
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateFloorDto,
  ) {
    const floor = await this.floorsService.findOne({ id });
    if (!floor)
      return ApiResponse.error(
        Code.NOT_FOUND_ERROR.code,
        Code.NOT_FOUND_ERROR.message,
      );
    const updated = await this.floorsService.update(id, body);
    return ApiResponse.success(updated);
  }

  @Get(':id/rooms')
  async getRooms(@Param('id', ParseIntPipe) id: number) {
    const { rooms } = await this.floorsService.findOne({ id });
    if (!rooms)
      return ApiResponse.error(
        Code.NOT_FOUND_ERROR.code,
        Code.NOT_FOUND_ERROR.message,
      );
    return ApiResponse.success(rooms);
  }
}
