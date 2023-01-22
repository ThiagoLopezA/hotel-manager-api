import { Module } from '@nestjs/common';
import { AddressController } from './controllers/address/address.controller';
import { AddressService } from './services/address/address.service';

@Module({
  controllers: [AddressController],
  providers: [AddressService]
})
export class ClientsModule {}
