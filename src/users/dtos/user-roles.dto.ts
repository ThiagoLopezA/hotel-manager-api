import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateUserRoleDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}

export class UpdateUserRoleDto extends PartialType(CreateUserRoleDto) {}
