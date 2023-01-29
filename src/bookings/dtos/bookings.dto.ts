import { IsNotEmpty, IsNumber, IsPositive, IsDate } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  readonly checkin: Date;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  readonly checkout: Date;

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
