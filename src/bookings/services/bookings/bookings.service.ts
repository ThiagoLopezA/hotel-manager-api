import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateBookingStateDto,
  UpdateBookingStateDto,
} from 'src/bookings/dtos/bookings-state.dto';
import {
  CreateBookingDto,
  UpdateBookingDto,
} from 'src/bookings/dtos/bookings.dto';
import { BookingState } from 'src/bookings/entities/booking-state.entity';
import { RoomsService } from 'src/rooms/services/rooms/rooms.service';
import { Repository } from 'typeorm';
import { Booking } from '../../entities/booking.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking) private bookingsRepo: Repository<Booking>,
    @InjectRepository(BookingState)
    private statesRepo: Repository<BookingState>,
    private roomsService: RoomsService,
  ) {}

  async findAll() {
    return await this.bookingsRepo.find({ relations: ['room', 'state'] });
  }

  async findOne(id: number) {
    const booking = await this.bookingsRepo.findOne({
      where: { id },
      relations: ['room', 'state'],
    });
    return booking;
  }

  async create(data: CreateBookingDto) {
    const newBooking = this.bookingsRepo.create(data);

    const state = await this.findOneState({ id: data.stateId });
    if (!state) throw new NotFoundException('stateId not found');
    newBooking.state = state;

    const room = await this.roomsService.findOne(data.roomId);
    if (!room) throw new NotFoundException('roomId not found');
    newBooking.room = room;

    return await this.bookingsRepo.save(newBooking);
  }

  async update(id: number, changes: UpdateBookingDto) {
    const booking = await this.bookingsRepo.findOne({ where: { id } });
    this.bookingsRepo.merge(booking, changes);
    return await this.bookingsRepo.save(booking);
  }

  async delete(id: number) {
    return await this.bookingsRepo.delete(id);
  }

  // Bookings State
  async findAllStates() {
    return await this.statesRepo.find();
  }

  async findOneState(key: { id?: number; name?: string }) {
    const booking = await this.statesRepo.findOne({
      where: key,
    });
    return booking;
  }

  async createState(data: CreateBookingStateDto) {
    const newBooking = this.statesRepo.create(data);
    return await this.statesRepo.save(newBooking);
  }

  async updateState(id: number, changes: UpdateBookingStateDto) {
    const booking = await this.statesRepo.findOne({ where: { id } });
    this.statesRepo.merge(booking, changes);
    return await this.statesRepo.save(booking);
  }

  async deleteState(id: number) {
    return await this.statesRepo.delete(id);
  }
}
