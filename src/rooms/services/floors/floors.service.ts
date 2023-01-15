import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Floor } from '../../entities/floor.entity';
import { CreateFloorDto, UpdateFloorDto } from '../../dtos/floors.dto';

@Injectable()
export class FloorsService {
  constructor(@InjectRepository(Floor) private floorRepo: Repository<Floor>) {}

  findAll() {
    return this.floorRepo.find();
  }

  findOne(id: number) {
    const floor = this.floorRepo.findOneBy({ id });
    if (Object.keys(floor).length === 0)
      throw new NotFoundException(`Floor #${id} not found`);
    return floor;
  }

  create(payload: CreateFloorDto) {
    const floor = this.floorRepo.create(payload);
    return this.floorRepo.save(floor);
  }

  delete(id: number) {
    return this.floorRepo.delete(id);
  }

  async update(id: number, changes: UpdateFloorDto) {
    const floor = await this.findOne(id);
    this.floorRepo.merge(floor, changes);
    return this.floorRepo.save(floor);
  }
}
