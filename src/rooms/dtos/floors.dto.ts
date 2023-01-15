import { IsNumber, IsPositive, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateFloorDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly number: number;
}

export class UpdateFloorDto extends PartialType(CreateFloorDto) {}
