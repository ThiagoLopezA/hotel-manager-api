import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoriesService } from './categories.service';
import { Category } from '../../entities/category.entity';

describe('CategoriesService', () => {
  let service: CategoriesService;

  const mockCategories = [
    {
      id: 1,
      name: 'mockCategory',
      description: 'a mocked category',
      price: 666.66,
    },
  ];
  const mockCategoriesRepository = {
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
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useValue: mockCategoriesRepository,
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new room category record and return it', async () => {
    expect(await service.create(mockCategories[0])).toEqual(mockCategories[0]);
  });

  it('should return all room categories', async () => {
    expect(await service.findAll()).toEqual(mockCategories);
  });

  it('should return a room category by id', async () => {
    expect(await service.findOne(1)).toEqual(mockCategories[0]);
  });

  it('should update a room category by id', async () => {
    expect(await service.update(1, { name: 'mockCategory' })).toEqual({
      ...mockCategories[0],
      name: 'mockCategory',
    });
  });

  it('should delete a room category by id', async () => {
    expect(await service.delete(1)).toEqual(mockCategories[0]);
  });
});
