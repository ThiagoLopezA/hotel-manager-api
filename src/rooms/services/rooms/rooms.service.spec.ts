import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { RoomsService } from './rooms.service';
import { Room } from '../../entities/room.entity';
import { Floor } from '../../entities/floor.entity';
import { Category } from '../../entities/category.entity';

describe('RoomsService', () => {
  let service: RoomsService;

  const mockRooms = [
    {
      id: 1,
      number: 1,
      floor: {
        id: 1,
        number: 1,
      },
    },
  ];

  const mockRoomsRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((dto) => Promise.resolve({ id: 2, ...dto })),
    find: jest.fn().mockImplementation(() => Promise.resolve(mockRooms[0])),
    findOne: jest.fn().mockImplementation(({ where }) => {
      const id = where.id;
      const number = where.number;

      if (number) return mockRooms.find((item) => item.number === number);
      else return mockRooms.find((item) => item.id === id);
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

  const mockCategoryRepository = {
    findOneBy: jest.fn().mockImplementation(({ id }) => ({
      id,
      name: 'Category A',
    })),
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
          provide: getRepositoryToken(Category),
          useValue: mockCategoryRepository,
        },
      ],
    }).compile();

    service = module.get<RoomsService>(RoomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should crate a new room and return it', async () => {
    expect(
      await service.create({ number: 2, floorId: 1, categoryId: 1 }),
    ).toEqual({
      id: 2,
      number: 2,
      floorId: 1,
      floor: {
        id: 1,
        number: 1,
      },
      category: {
        id: 1,
        name: 'Category A',
      },
      categoryId: 1,
    });
  });

  it('should find all rooms', async () => {
    expect(await service.findAll()).toEqual(mockRooms[0]);
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
    const oldRoom: Room = {
      id: 1,
      number: 1,
      floor: {
        id: 1,
        number: 1,
      },
      category: {
        id: 1,
        name: 'Category A',
        description: 'bla bla',
        price: 100,
        rooms: [],
      },
    };
    expect(await service.update(oldRoom, { number: 3 })).toEqual(oldRoom);
  });

  it('should delete a room by id', async () => {
    expect(await service.delete(2)).toEqual({ id: 2, number: 1 });
  });
});
