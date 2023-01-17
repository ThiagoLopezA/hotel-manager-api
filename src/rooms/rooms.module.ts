import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoomsController } from './controllers/rooms/rooms.controller';
import { RoomsService } from './services/rooms/rooms.service';
import { FloorsService } from './services/floors/floors.service';
import { Floor } from './entities/floor.entity';
import { FloorsController } from './controllers/floors/floors.controller';
import { RoomCategory } from './entities/room-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Floor, RoomCategory])],
  controllers: [RoomsController, FloorsController],
  providers: [RoomsService, FloorsService],
})
export class RoomsModule {}
