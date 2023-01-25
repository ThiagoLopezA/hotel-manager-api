import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRolesController } from './controllers/user-roles/user-roles.controller';
import { UserRole } from './entities/user-role.entity';
import { UserRolesService } from './services/user-roles/user-roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole])],
  controllers: [UserRolesController],
  providers: [UserRolesService],
})
export class UsersModule {}
