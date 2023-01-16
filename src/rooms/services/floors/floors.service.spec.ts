import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Floor } from '../../entities/floor.entity';
import { FloorsService } from './floors.service';

describe('FloorsService', () => {
  let service: FloorsService;
  const mockFloorsRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((dto) => Promise.resolve({ id: 1, ...dto })),
    find: jest.fn().mockImplementation(() => Promise.resolve([])),
    findOneBy: jest.fn().mockImplementation((obj) => {
      const { id } = obj;
      return { id, number: 1 };
    }),
    delete: jest.fn().mockImplementation((id) => {
      return { id, number: 1 };
    }),
    merge: jest
      .fn()
      .mockImplementation((floor, changes) => ({ ...floor, ...changes })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FloorsService,
        {
          provide: getRepositoryToken(Floor),
          useValue: mockFloorsRepository,
        },
      ],
    }).compile();

    service = module.get<FloorsService>(FloorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new floor record and return it', async () => {
    expect(await service.create({ number: 1 })).toEqual({
      number: 1,
      id: 1,
    });
  });

  it('should find an empty array', async () => {
    expect(await service.findAll()).toEqual([]);
  });

  it('should find a floor by id', async () => {
    expect(await service.findOne(1)).toEqual({ id: 1, number: 1 });
  });

  it('should delete a floor by id', async () => {
    expect(await service.delete(1)).toEqual({ id: 1, number: 1 });
  });
  // see later
  it('should update a floor by id', async () => {
    expect(await service.update(1, { number: 2 })).toEqual({
      id: 1,
      number: 1,
    });
  });
});
