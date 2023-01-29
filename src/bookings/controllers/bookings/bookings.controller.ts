import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import {
  CreateBookingDto,
  UpdateBookingDto,
} from 'src/bookings/dtos/bookings.dto';
import { BookingsService } from 'src/bookings/services/bookings/bookings.service';
import { ApiResponse } from '../../../common/api/apiResponse';
import { Code } from '../../../common/code/code';

@Controller('bookings')
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  @Get()
  async getBookings() {
    const bookings = await this.bookingsService.findAll();
    return ApiResponse.success(bookings);
  }

  @Get(':id')
  async getBooking(@Param('id', ParseIntPipe) id: number) {
    const booking = await this.bookingsService.findOne(id);
    if (!booking)
      return ApiResponse.error(
        Code.NOT_FOUND_ERROR.code,
        Code.NOT_FOUND_ERROR.message,
      );
    return ApiResponse.success(booking);
  }

  @Post()
  create(@Body() data: CreateBookingDto) {
    const newBooking = this.bookingsService.create(data);
    return ApiResponse.created(newBooking);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() changes: UpdateBookingDto,
  ) {
    const booking = await this.bookingsService.findOne(id);
    if (!booking)
      return ApiResponse.error(
        Code.NOT_FOUND_ERROR.code,
        Code.NOT_FOUND_ERROR.message,
      );
    const updated = await this.bookingsService.update(booking.id, changes);
    return ApiResponse.success(updated);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const booking = await this.bookingsService.findOne(id);
    if (!booking)
      return ApiResponse.error(
        Code.NOT_FOUND_ERROR.code,
        Code.NOT_FOUND_ERROR.message,
      );
    await this.bookingsService.delete(booking.id);
    return ApiResponse.success(booking);
  }
}
