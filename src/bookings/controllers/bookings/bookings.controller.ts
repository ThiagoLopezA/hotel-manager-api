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
import { CreateBookingDto, UpdateBookingDto } from '../../dtos/bookings.dto';
import { BookingsService } from '../../services/bookings/bookings.service';
import { ApiResponse } from '../../../common/api/apiResponse';
import { Code } from '../../../common/code/code';
import {
  CreateBookingStateDto,
  UpdateBookingStateDto,
} from '../../dtos/bookings-state.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  // Bookings State
  @Get('states')
  async getBookingsStates() {
    const states = await this.bookingsService.findAllStates();
    return ApiResponse.success(states);
  }

  @Get('states/:id')
  async getBookingState(@Param('id', ParseIntPipe) id: number) {
    const state = await this.bookingsService.findOneState({ id });
    if (!state)
      return ApiResponse.error(
        Code.NOT_FOUND_ERROR.code,
        Code.NOT_FOUND_ERROR.message,
      );
    return ApiResponse.success(state);
  }

  @Post('states')
  async createState(@Body() data: CreateBookingStateDto) {
    const stateAlreadyExists = await this.bookingsService.findOneState({
      name: data.name,
    });
    if (stateAlreadyExists)
      return ApiResponse.error(
        Code.ENTITY_ALREADY_EXISTS_ERROR.code,
        Code.ENTITY_ALREADY_EXISTS_ERROR.message,
      );
    const newstate = await this.bookingsService.createState(data);
    return ApiResponse.created(newstate);
  }

  @Put('states/:id')
  async updateState(
    @Param('id', ParseIntPipe) id: number,
    @Body() changes: UpdateBookingStateDto,
  ) {
    const state = await this.bookingsService.findOneState({ id });
    if (!state)
      return ApiResponse.error(
        Code.NOT_FOUND_ERROR.code,
        Code.NOT_FOUND_ERROR.message,
      );
    const updated = await this.bookingsService.updateState(state.id, changes);
    return ApiResponse.success(updated);
  }

  @Delete('states/:id')
  async deleteState(@Param('id', ParseIntPipe) id: number) {
    const state = await this.bookingsService.findOneState({ id });
    if (!state)
      return ApiResponse.error(
        Code.NOT_FOUND_ERROR.code,
        Code.NOT_FOUND_ERROR.message,
      );
    await this.bookingsService.deleteState(state.id);
    return ApiResponse.success(state);
  }

  // Bookings

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
  async create(@Body() data: CreateBookingDto) {
    const newBooking = await this.bookingsService.create(data);
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
