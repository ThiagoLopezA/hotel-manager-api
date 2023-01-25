import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRole } from '../../entities/user-role.entity';
import { UserRolesService } from './user-roles.service';

describe('UserRolesService', () => {
  let service: UserRolesService;
  const mockData = [{ name: 'administrator', id: 1 }];
  const mockUserRolesRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((dto) => Promise.resolve({ id: 2, ...dto })),
    find: jest.fn().mockImplementation(() => mockData),
    findOneBy: jest
      .fn()
      .mockImplementation(({ id }) => mockData.find((e) => e.id === id)),
    delete: jest.fn().mockImplementation((id) => {
      return mockData.find((e) => e.id === id);
    }),
    merge: jest.fn().mockImplementation((object, changes) => ({
      ...object,
      ...changes,
    })),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRolesService,
        {
          provide: getRepositoryToken(UserRole),
          useValue: mockUserRolesRepository,
        },
      ],
    }).compile();

    service = module.get<UserRolesService>(UserRolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new room category record and return it', async () => {
    expect(await service.create(mockData[0])).toEqual(mockData[0]);
  });

  it('should return all room categories', async () => {
    expect(await service.findAll()).toEqual(mockData);
  });

  it('should return a room category by id', async () => {
    expect(await service.findOne({ id: 1 })).toEqual(mockData[0]);
  });

  it('should delete a room category by id', async () => {
    expect(await service.delete(1)).toEqual(mockData[0]);
  });

  it('should update a room category by id', async () => {
    expect(await service.update(1, { name: 'administrator' })).toEqual({
      ...mockData[0],
      name: 'administrator',
    });
  });
});
