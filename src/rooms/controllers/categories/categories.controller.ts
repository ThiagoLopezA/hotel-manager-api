import {
  Controller,
  Param,
  Body,
  Post,
  Get,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { CategoriesService } from 'src/rooms/services/categories/categories.service';
import {
  CreateRoomCategoryDto,
  UpdateRoomCategoryDto,
} from '../../dtos/rooms-categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  createCategory(@Body() payload: CreateRoomCategoryDto) {
    return this.categoriesService.create(payload);
  }

  @Get()
  async getCategories() {
    return await this.categoriesService.findAll();
  }

  @Get(':id')
  getCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id);
  }

  @Put(':id')
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateRoomCategoryDto,
  ) {
    return this.categoriesService.update(id, payload);
  }

  @Delete(':id')
  deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.delete(id);
  }
}
