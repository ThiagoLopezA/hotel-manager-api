import { Module } from '@nestjs/common';
import { RoomsController } from './controllers/rooms.controller';

@Module({
  controllers: [RoomsController]
})
export class RoomsModule {}
