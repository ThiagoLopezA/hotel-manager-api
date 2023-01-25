import { IsNumber, IsPositive, IsNotEmpty } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly number: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly floorId: number;

  // @IsNumber()
  // @IsPositive()
  // @IsNotEmpty()
  // readonly categoryId: number;
}

export class UpdateRoomDto extends PartialType(CreateRoomDto) {}
