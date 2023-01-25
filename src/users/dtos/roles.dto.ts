import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
