import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RoomCategory } from '../../entities/room-category.entity';
import { Floor } from '../../entities/floor.entity';
import { Room } from '../../entities/room.entity';
import { RoomsService } from './rooms.service';

describe('RoomsService', () => {
  let service: RoomsService;

  const mockRoomsRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((dto) => Promise.resolve({ id: 1, ...dto })),
    find: jest.fn().mockImplementation(() => Promise.resolve([])),
    findOne: jest.fn().mockImplementation(({ where }) => {
      const id = where.id;
      const number = where.number;
      const floor = { id: 1, number: 1 };

      if (number) return { id: 1, number, floor };
      else return { id, number: 1, floor };
    }),
    delete: jest.fn().mockImplementation((id) => {
      return { id, number: 1 };
    }),
    merge: jest
      .fn()
      .mockImplementation((floor, changes) => ({ ...floor, ...changes })),
  };

  const mockFloorRepository = {
    findOneBy: jest.fn().mockImplementation((obj) => {
      const id = obj.id;
      return { id, number: 1 };
    }),
  };

  const mockCategories = [
    {
      id: 1,
      name: 'mockCategory',
      description: 'a mocked category',
      price: 666.66,
    },
  ];
  const mockRoomCategoryRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((dto) => Promise.resolve({ id: 1, ...dto })),
    find: jest.fn().mockImplementation(() => mockCategories),
    findOneBy: jest
      .fn()
      .mockImplementation(({ id }) => mockCategories.find((c) => c.id === id)),
    merge: jest.fn().mockImplementation((category, changes) => ({
      ...category,
      ...changes,
    })),
    delete: jest.fn().mockImplementation((id) => {
      return mockCategories.find((c) => c.id === id);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomsService,
        {
          provide: getRepositoryToken(Room),
          useValue: mockRoomsRepository,
        },
        {
          provide: getRepositoryToken(Floor),
          useValue: mockFloorRepository,
        },
        {
          provide: getRepositoryToken(RoomCategory),
          useValue: mockRoomCategoryRepository,
        },
      ],
    }).compile();

    service = module.get<RoomsService>(RoomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should crate a new room and return it', async () => {
    expect(await service.create({ number: 1, floorId: 1 })).toEqual({
      id: 1,
      number: 1,
      floorId: 1,
      floor: {
        id: 1,
        number: 1,
      },
    });
  });

  it('should find an empty array', async () => {
    expect(await service.findAll()).toEqual([]);
  });

  it('should find a room by id', async () => {
    expect(await service.findOne(1)).toEqual({
      id: 1,
      number: 1,
      floor: {
        id: 1,
        number: 1,
      },
    });
  });

  it('should find a room by number', async () => {
    expect(await service.findOneBy({ number: 1 })).toEqual({
      id: 1,
      number: 1,
      floor: {
        id: 1,
        number: 1,
      },
    });
  });

  it('should update a room', async () => {
    const oldRoom = {
      id: 1,
      number: 1,
      floor: {
        id: 1,
        number: 1,
      },
    };
    expect(await service.update(oldRoom, { number: 3 })).toEqual(oldRoom);
  });

  it('should delete a room by id', async () => {
    expect(await service.delete(2)).toEqual({ id: 2, number: 1 });
  });

  // _____ROOM_CATEGORY:
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

  it('should update a room category by id', async () => {
    expect(await service.updateCategory(1, { name: 'mockCategory' })).toEqual({
      ...mockCategories[0],
      name: 'mockCategory',
    });
  });

  it('should delete a room category by id', async () => {
    expect(await service.deleteCategory(1)).toEqual(mockCategories[0]);
  });
});
