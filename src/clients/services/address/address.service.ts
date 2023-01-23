import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Address } from '../../entities/address.entity';
import { CreateAddressDto, UpdateAddressDto } from '../../dtos/address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address) private addressRepo: Repository<Address>,
  ) {}

  async findAll() {
    return await this.addressRepo.find();
  }

  async findOne(params: object) {
    const address = await this.addressRepo.findOneBy(params);
    return address;
  }

  async create(payload: CreateAddressDto) {
    return await this.addressRepo.save(this.addressRepo.create(payload));
  }

  async delete(id: number) {
    return await this.addressRepo.delete(id);
  }

  async update(id: number, changes: UpdateAddressDto) {
    const address = await this.findOne({ id });
    this.addressRepo.merge(address, changes);
    return this.addressRepo.save(address);
  }
}
