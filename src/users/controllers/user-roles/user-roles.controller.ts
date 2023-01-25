import {
  Controller,
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  CreateUserRoleDto,
  UpdateUserRoleDto,
} from '../../dtos/user-roles.dto';
import { UserRolesService } from '../../services/user-roles/user-roles.service';
import { ApiResponse, Code } from '../../../common';

@ApiTags('User roles')
@Controller('user-roles')
export class UserRolesController {
  constructor(private userRolesService: UserRolesService) {}

  @Get()
  async findAll() {
    const roles = await this.userRolesService.findAll();
    return ApiResponse.success(roles);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const role = await this.userRolesService.findOne({ id });
    if (!role) {
      return ApiResponse.error(
        Code.NOT_FOUND_ERROR.code,
        Code.NOT_FOUND_ERROR.message,
      );
    }
    return ApiResponse.success(role);
  }

  @Post()
  async create(@Body() body: CreateUserRoleDto) {
    const role = await this.userRolesService.findOne({ name: body.name });
    if (role) {
      return ApiResponse.error(
        Code.ENTITY_ALREADY_EXISTS_ERROR.code,
        Code.ENTITY_ALREADY_EXISTS_ERROR.message,
      );
    }
    const newRole = await this.userRolesService.create(body);
    return ApiResponse.success(newRole);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const role = await this.userRolesService.findOne({ id });
    if (!role) {
      return ApiResponse.error(
        Code.NOT_FOUND_ERROR.code,
        Code.NOT_FOUND_ERROR.message,
      );
    }
    await this.userRolesService.delete(id);
    return ApiResponse.success();
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserRoleDto,
  ) {
    const role = await this.userRolesService.findOne({ id });
    if (!role) {
      return ApiResponse.error(
        Code.NOT_FOUND_ERROR.code,
        Code.NOT_FOUND_ERROR.message,
      );
    }
    const updated = await this.userRolesService.update(id, body);
    return ApiResponse.success(updated);
  }
}
