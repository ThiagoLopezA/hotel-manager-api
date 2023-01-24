import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse, Code } from '../../../common';

import { CreateAddressDto, UpdateAddressDto } from '../../dtos/address.dto';
import { AddressService } from '../../services/address/address.service';

@ApiTags('Address')
@Controller('addresses')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Get()
  async findAll() {
    const addresses = await this.addressService.findAll();
    return ApiResponse.success(addresses);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const address = await this.addressService.findOne({ id });
    if (!address)
      return ApiResponse.error(
        Code.NOT_FOUND_ERROR.code,
        Code.NOT_FOUND_ERROR.message,
      );
    return ApiResponse.success(address);
  }

  @Post()
  async create(@Body() body: CreateAddressDto) {
    const address = await this.addressService.create(body);
    return ApiResponse.success(address);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const address = await this.addressService.findOne({ id });
    if (!address) {
      return ApiResponse.error(
        Code.NOT_FOUND_ERROR.code,
        Code.NOT_FOUND_ERROR.message,
      );
    }
    await this.addressService.delete(id);
    return ApiResponse.success();
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateAddressDto,
  ) {
    const address = await this.addressService.findOne({ id });
    if (!address) {
      return ApiResponse.error(
        Code.NOT_FOUND_ERROR.code,
        Code.NOT_FOUND_ERROR.message,
      );
    }
    await this.addressService.update(id, body);
    return ApiResponse.success();
  }
}
