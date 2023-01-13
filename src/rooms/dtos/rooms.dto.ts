import { IsNumber, IsPositive, IsNotEmpty } from 'class-validator';
// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';

export class CreateRoomDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly number: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly floorId: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly categoryId: number;
}

export class UpdateRoomDto extends PartialType(CreateRoomDto) {}
