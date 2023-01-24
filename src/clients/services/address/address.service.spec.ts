import { Test, TestingModule } from '@nestjs/testing';
import { AddressService } from './address.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Address } from '../../entities/address.entity';

describe('AddressService', () => {
  let service: AddressService;
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
  const mockAddressRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((dto) => Promise.resolve({ id: 1, ...dto })),
    find: jest.fn().mockImplementation(() => Promise.resolve([])),
    findOneBy: jest.fn().mockImplementation((obj) => {
      const { id } = obj;
      return mockData.find((a) => a.id === id);
    }),
    delete: jest.fn().mockImplementation((id) => {
      return mockData.find((a) => a.id === id);
    }),
    merge: jest
      .fn()
      .mockImplementation((address, changes) => ({ ...address, changes })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: getRepositoryToken(Address),
          useValue: mockAddressRepository,
        },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new address and return it', async () => {
    const address = mockData[0];
    expect(await service.create(address)).toEqual(mockData[0]);
  });

  it('should find an empty array', async () => {
    expect(await service.findAll()).toEqual([]);
  });

  it('should find an address by id', async () => {
    expect(await service.findOne({ id: 1 })).toEqual(mockData[0]);
  });

  it('should update an address by id', async () => {
    expect(await service.update(1, mockData[0])).toEqual(mockData[0]);
  });
});
