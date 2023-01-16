import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoomsController } from './controllers/rooms.controller';
import { RoomsService } from './services/rooms.service';
import { FloorsService } from './services/floors/floors.service';
import { Floor } from './entities/floor.entity';
import { FloorsController } from './controllers/floors/floors.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Floor])],
  controllers: [RoomsController, FloorsController],
  providers: [RoomsService, FloorsService],
})
export class RoomsModule {}
