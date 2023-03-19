import {
  Controller,
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateRoleDto, UpdateRoleDto } from '../../dtos/roles.dto';
import { RolesService } from '../../services/roles/roles.service';
import { ApiResponse, Code } from '../../../common';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';

@ApiTags('User roles')
@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get()
  async findAll() {
    const roles = await this.rolesService.findAll();
    return ApiResponse.success(roles);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const role = await this.rolesService.findOne({ id });
    if (!role) {
      return ApiResponse.error(
        Code.NOT_FOUND_ERROR.code,
        Code.NOT_FOUND_ERROR.message,
      );
    }
    return ApiResponse.success(role);
  }

  @Post()
  async create(@Body() body: CreateRoleDto) {
    const role = await this.rolesService.findOne({ name: body.name });
    if (role) {
      return ApiResponse.error(
        Code.ENTITY_ALREADY_EXISTS_ERROR.code,
        Code.ENTITY_ALREADY_EXISTS_ERROR.message,
      );
    }
    const newRole = await this.rolesService.create(body);
    return ApiResponse.success(newRole);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const role = await this.rolesService.findOne({ id });
    if (!role) {
      return ApiResponse.error(
        Code.NOT_FOUND_ERROR.code,
        Code.NOT_FOUND_ERROR.message,
      );
    }
    await this.rolesService.delete(id);
    return ApiResponse.success();
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateRoleDto,
  ) {
    const role = await this.rolesService.findOne({ id });
    if (!role) {
      return ApiResponse.error(
        Code.NOT_FOUND_ERROR.code,
        Code.NOT_FOUND_ERROR.message,
      );
    }
    const updated = await this.rolesService.update(id, body);
    return ApiResponse.success(updated);
  }
}
