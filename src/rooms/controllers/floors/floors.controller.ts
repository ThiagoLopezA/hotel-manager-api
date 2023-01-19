import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateFloorDto, UpdateFloorDto } from '../../dtos/floors.dto';
import { FloorsService } from '../../services/floors/floors.service';
import { ApiResponse } from '../../../common';

@ApiTags('Floors')
@Controller('floors')
export class FloorsController {
  constructor(private floorsService: FloorsService) {}

  @Get()
  async findAll() {
    const floors = await this.floorsService.findAll();
    return ApiResponse.success(floors);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const floor = await this.floorsService.findOne({ id });
    if (!floor) throw new NotFoundException();
    return ApiResponse.success(floor);
  }

  // @Get(':id/rooms')

  @Post()
  async create(@Body() body: CreateFloorDto) {
    const floor = await this.floorsService.findOne({ number: body.number });
    if (floor) throw new ConflictException('This entity already exists');
    const newFloor = await this.floorsService.create(body);
    return ApiResponse.created(newFloor);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const floor = await this.floorsService.findOne({ id });
    if (!floor) throw new NotFoundException();
    await this.floorsService.delete(id);
    return ApiResponse.success();
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UpdateFloorDto) {
    const floor = await this.floorsService.findOne({ id });
    if (!floor) throw new NotFoundException();
    const updated = await this.floorsService.update(id, body);
    return ApiResponse.success(updated);
  }
}
