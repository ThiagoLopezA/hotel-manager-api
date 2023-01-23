import { Test, TestingModule } from '@nestjs/testing';
import { AddressService } from '../../services/address/address.service';
import { AddressController } from './address.controller';

describe('AddressController', () => {
  let controller: AddressController;
  const mockData = [
    {
      id: 1,
      country: 'Argentina',
      state: 'San luis',
      city: 'Belgrano',
      street: 'Corrientes',
      number: 152,
      floor: 1,
      zip: 3536,
    },
  ];

  const mockAddressesService = {
    create: jest.fn((dto) => {
      return {
        ...dto,
        id: 2,
      };
    }),
    update: jest.fn((id, dto) => {
      const mock = mockData.find((a) => a.id === id);
      return { ...mock, ...dto };
    }),
    findAll: jest.fn(() => {
      return mockData;
    }),
    findOne: jest.fn(({ id }) => {
      return mockData.find((a) => a.id === id);
    }),
    delete: jest.fn((id) => {
      return { code: 200 };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressController],
      providers: [AddressService],
    })
      .overrideProvider(AddressService)
      .useValue(mockAddressesService)
      .compile();

    controller = module.get<AddressController>(AddressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create method', () => {
    it('should create address', async () => {
      const payload = {
        country: 'Argentina',
        state: 'San luis',
        city: 'Belgrano',
        street: 'Corrientes',
        number: 152,
        floor: 1,
        zip: 3536,
      };
      const result = await controller.create(payload);
      expect(result.data).toEqual({
        ...payload,
        id: 2,
      });
    });
  });

  describe('Update method', () => {
    it('should update method', async () => {
      const payload = {
        state: 'Buenos aires',
      };
      const result = await controller.update(1, payload);
      expect(result.code).toEqual(200);
    });
  });

  describe('Get all method', () => {
    it('should get all addresses', async () => {
      const result = await controller.findAll();
      expect(result.data).toEqual(mockData);
    });
  });

  describe('Get one method', () => {
    it('should get one address', async () => {
      const result = await controller.findOne(1);
      expect(result.data).toEqual(mockData[0]);
    });
  });

  describe('Delete one method', () => {
    it('should delete one address', async () => {
      const result = await controller.delete(1);
      expect(result.code).toEqual(200);
    });
  });
});
