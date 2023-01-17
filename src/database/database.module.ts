import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from '../config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, password, name, port } = configService.database;
        return {
          type: 'postgres',
          host,
          port,
          username: user,
          database: name,
          password,
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
