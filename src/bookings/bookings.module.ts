import { Module } from '@nestjs/common';
import { BookingsController } from './controllers/bookings/bookings.controller';
import { BookingsService } from './services/bookings/bookings.service';

@Module({
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
