import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiResponse, Code } from '../../../common';
import { CreateUserDto, UpdateUserDto } from '../../dtos/users.dto';
import { UsersService } from '../../services/users/users.service';

@ApiTags('User')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return ApiResponse.success(users);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne({ id });
    if (!user) {
      return ApiResponse.error(
        Code.NOT_FOUND_ERROR.code,
        Code.NOT_FOUND_ERROR.message,
      );
    }
    return ApiResponse.success(user);
  }

  @Post()
  async create(@Body() body: CreateUserDto) {
    const user = await this.usersService.findOne({ email: body.email });
    if (user) {
      return ApiResponse.error(
        Code.ENTITY_ALREADY_EXISTS_ERROR.code,
        Code.ENTITY_ALREADY_EXISTS_ERROR.message,
      );
    }
    const newUser = await this.usersService.create(body);
    return ApiResponse.created(newUser);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne({ id });
    if (!user) {
      return ApiResponse.error(
        Code.NOT_FOUND_ERROR.code,
        Code.NOT_FOUND_ERROR.message,
      );
    }
    await this.usersService.delete(id);
    return ApiResponse.success();
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    const user = await this.usersService.findOne({ id });
    if (!user) {
      return ApiResponse.error(
        Code.NOT_FOUND_ERROR.code,
        Code.NOT_FOUND_ERROR.message,
      );
    }
    const updated = await this.usersService.update(id, body);
    return ApiResponse.success(updated);
  }
}
