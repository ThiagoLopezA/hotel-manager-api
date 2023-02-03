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
import { ApiTags } from '@nestjs/swagger';

import { CategoriesService } from '../../services/categories/categories.service';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from '../../dtos/categories.dto';
import { ApiResponse } from '../../../common/api/apiResponse';
import { Code } from '../../../common/code/code';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  async createCategory(@Body() payload: CreateCategoryDto) {
    const categoryAlreadyExits = await this.categoriesService.findOneBy({
      name: payload.name,
    });
    if (categoryAlreadyExits)
      return ApiResponse.error(
        Code.ENTITY_ALREADY_EXISTS_ERROR.code,
        Code.ENTITY_ALREADY_EXISTS_ERROR.message,
      );
    const category = await this.categoriesService.create(payload);
    return ApiResponse.created(category);
  }

  @Get()
  async getCategories() {
    const categories = await this.categoriesService.findAll();
    return ApiResponse.success(categories);
  }

  @Get(':id')
  async getCategory(@Param('id', ParseIntPipe) id: number) {
    const category = await this.categoriesService.findOne(id);
    if (!category)
      return ApiResponse.error(
        Code.NOT_FOUND_ERROR.code,
        Code.NOT_FOUND_ERROR.message,
      );
    return ApiResponse.success(category);
  }

  @Put(':id')
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCategoryDto,
  ) {
    const category = await this.categoriesService.findOne(id);
    if (!category)
      return ApiResponse.error(
        Code.NOT_FOUND_ERROR.code,
        Code.NOT_FOUND_ERROR.message,
      );
    const updated = await this.categoriesService.update(category.id, payload);
    return ApiResponse.success(updated);
  }

  @Delete(':id')
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    const category = await this.categoriesService.findOne(id);
    if (!category)
      return ApiResponse.error(
        Code.NOT_FOUND_ERROR.code,
        Code.NOT_FOUND_ERROR.message,
      );
    await this.categoriesService.delete(category.id);
    return ApiResponse.success(category);
  }
}
