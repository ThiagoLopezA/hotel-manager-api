import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  readonly country: string;

  @IsString()
  @IsNotEmpty()
  readonly state: string;

  @IsString()
  @IsNotEmpty()
  readonly city: string;

  @IsString()
  @IsNotEmpty()
  readonly street: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly number: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly floor: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly zip: number;
}

export class UpdateAddressDto extends PartialType(CreateAddressDto) {}
