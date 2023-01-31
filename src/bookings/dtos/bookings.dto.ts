import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsDateString,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  readonly checkIn: Date;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  readonly checkOut: Date;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly roomId: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly stateId: number;
}

export class UpdateBookingDto extends PartialType(CreateBookingDto) {}
