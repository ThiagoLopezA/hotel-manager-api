import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from '../../entities/category.entity';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from '../../dtos/categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepo: Repository<Category>,
  ) {}

  async create(payload: CreateCategoryDto) {
    const newCategory = this.categoriesRepo.create(payload);
    return await this.categoriesRepo.save(newCategory);
  }

  async findAll() {
    return await this.categoriesRepo.find();
  }

  async findOne(id: number) {
    return await this.categoriesRepo.findOneBy({ id });
  }

  async findOneBy(key: UpdateCategoryDto) {
    return await this.categoriesRepo.findOneBy(key);
  }

  async update(id: number, changes: UpdateCategoryDto) {
    const category = await this.findOne(id);
    this.categoriesRepo.merge(category, changes);
    return await this.categoriesRepo.save(category);
  }

  async delete(id: number) {
    return await this.categoriesRepo.delete(id);
  }
}
