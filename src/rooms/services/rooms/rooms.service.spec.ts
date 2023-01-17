import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RoomCategory } from '../../entities/room-category.entity';
import { RoomsService } from './rooms.service';

describe('RoomsService', () => {
  let service: RoomsService;
  const mockCategories = [
    {
      id: 1,
      name: 'mockCategory',
      description: 'a mocked category',
      price: 666.66,
    },
  ];
  const mockRoomsRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((dto) => Promise.resolve({ id: 1, ...dto })),
    find: jest.fn().mockImplementation(() => mockCategories),
    findOneBy: jest
      .fn()
      .mockImplementation(({ id }) => mockCategories.find((c) => c.id === id)),
    delete: jest.fn().mockImplementation((id) => {
      return mockCategories.find((c) => c.id === id);
    }),
    merge: jest.fn().mockImplementation((category, changes) => ({
      ...category,
      ...changes,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomsService,
        {
          provide: getRepositoryToken(RoomCategory),
          useValue: mockRoomsRepository,
        },
      ],
    }).compile();

    service = module.get<RoomsService>(RoomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new room category record and return it', async () => {
    expect(await service.createCategory(mockCategories[0])).toEqual(
      mockCategories[0],
    );
  });

  it('should return all room categories', async () => {
    expect(await service.findAllCategories()).toEqual(mockCategories);
  });

  it('should return a room category by id', async () => {
    expect(await service.findOneCategory(1)).toEqual(mockCategories[0]);
  });

  it('should delete a room category by id', async () => {
    expect(await service.deleteCategory(1)).toEqual(mockCategories[0]);
  });

  it('should update a room category by id', async () => {
    expect(await service.updateCategory(1, { name: 'mockCategory' })).toEqual({
      ...mockCategories[0],
      name: 'mockCategory',
    });
  });
});
