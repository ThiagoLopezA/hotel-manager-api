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

@ApiTags('Floors')
@Controller('floors')
export class FloorsController {
  constructor(private floorsService: FloorsService) {}

  @Get()
  async findAll() {
    const floors = await this.floorsService.findAll();
    return floors;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const floor = await this.floorsService.findOne({ id });
    if (!floor) throw new NotFoundException();
    return floor;
  }

  // @Get(':id/rooms')

  @Post()
  async create(@Body() body: CreateFloorDto) {
    const floor = await this.floorsService.findOne({ number: body.number });
    if (floor) throw new ConflictException('This entity already exists');
    return await this.floorsService.create(body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const floor = await this.floorsService.findOne({ id });
    if (!floor) throw new NotFoundException();
    return await this.floorsService.delete(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UpdateFloorDto) {
    const floor = await this.floorsService.findOne({ id });
    if (!floor) throw new NotFoundException();
    return await this.floorsService.update(id, body);
  }
}
