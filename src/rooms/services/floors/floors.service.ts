import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Floor } from '../../entities/floor.entity';
import { CreateFloorDto, UpdateFloorDto } from '../../dtos/floors.dto';

@Injectable()
export class FloorsService {
  constructor(@InjectRepository(Floor) private floorRepo: Repository<Floor>) {}

  async findAll() {
    return await this.floorRepo.find();
  }

  async findOne(params: object) {
    const floor = await this.floorRepo.findOneBy(params);
    return floor;
  }

  async create(payload: CreateFloorDto) {
    return await this.floorRepo.save(this.floorRepo.create(payload));
  }

  async delete(id: number) {
    return await this.floorRepo.delete(id);
  }

  async update(id: number, changes: UpdateFloorDto) {
    const floor = await this.findOne({ id });
    this.floorRepo.merge(floor, changes);
    return this.floorRepo.save(floor);
  }
}
