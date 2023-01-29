import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { Booking } from '../entities/booking.entity';

export class CreateBookingStateDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsOptional()
  @IsArray()
  readonly bookings: Booking[];
}

export class UpdateBookingStateDto extends PartialType(CreateBookingStateDto) {}
