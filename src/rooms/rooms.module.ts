import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoomsController } from './controllers/rooms/rooms.controller';
import { RoomsService } from './services/rooms/rooms.service';
import { Room } from './entities/room.entity';
import { FloorsController } from './controllers/floors/floors.controller';
import { FloorsService } from './services/floors/floors.service';
import { Floor } from './entities/floor.entity';
import { Category } from './entities/category.entity';
import { CategoriesService } from './services/categories/categories.service';
import { CategoriesController } from './controllers/categories/categories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Floor, Category])],
  controllers: [RoomsController, FloorsController, CategoriesController],
  providers: [RoomsService, FloorsService, CategoriesService],
})
export class RoomsModule {}
