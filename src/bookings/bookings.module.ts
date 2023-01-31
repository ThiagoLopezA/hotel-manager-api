import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookingsController } from './controllers/bookings/bookings.controller';
import { BookingsService } from './services/bookings/bookings.service';
import { Booking } from './entities/booking.entity';
import { BookingState } from './entities/booking-state.entity';
import { RoomsModule } from '../rooms/rooms.module';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, BookingState]), RoomsModule],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
