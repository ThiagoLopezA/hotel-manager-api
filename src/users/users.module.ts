import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesController } from './controllers/roles/roles.controller';
import { Role } from './entities/role.entity';
import { RolesService } from './services/roles/roles.service';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, User])],
  controllers: [RolesController, UsersController],
  providers: [RolesService, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
