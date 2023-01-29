import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateBookingDto,
  UpdateBookingDto,
} from 'src/bookings/dtos/bookings.dto';
import { Repository } from 'typeorm';
import { Booking } from '../../entities/booking.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking) private bookingsRepo: Repository<Booking>,
  ) {}

  async findAll() {
    return await this.bookingsRepo.find({ relations: ['room'] });
  }

  async findOne(id: number) {
    const booking = await this.bookingsRepo.findOne({
      where: { id },
      relations: ['room'],
    });
    return booking;
  }

  async create(data: CreateBookingDto) {
    const newBooking = this.bookingsRepo.create(data);
    return await this.bookingsRepo.save(newBooking);
  }

  async update(id: number, changes: UpdateBookingDto) {
    const booking = await this.findOne(id);
    this.bookingsRepo.merge(booking, changes);
    return await this.bookingsRepo.save(booking);
  }

  async delete(id: number) {
    return await this.bookingsRepo.delete(id);
  }
}
