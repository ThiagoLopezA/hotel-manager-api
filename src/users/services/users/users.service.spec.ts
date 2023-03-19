import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  const mockData = [
    {
      id: 1,
      firstName: 'Pedro',
      lastName: 'Lopez',
      email: 'pedro@hotmail.com',
      password: 'encryptedpassword',
      roleId: 1,
    },
  ];

  const mockUsersRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((dto) => Promise.resolve({ id: 2, ...dto })),
    find: jest.fn().mockImplementation(() => mockData),
    findOne: jest.fn().mockImplementation((params) => {
      return mockData.find((e) => e.id === params.where.id);
    }),
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
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user record and return it', async () => {
    expect(await service.create(mockData[0])).toEqual(mockData[0]);
  });

  it('should return all users', async () => {
    expect(await service.findAll()).toEqual(mockData);
  });

  it('should return a user by id', async () => {
    expect(await service.findOne({ id: 1 })).toEqual(mockData[0]);
  });

  it('should delete a user by id', async () => {
    expect(await service.delete(1)).toEqual(mockData[0]);
  });

  it('should update a user by id', async () => {
    expect(await service.update(1, { firstName: 'Pedro' })).toEqual({
      ...mockData[0],
      firstName: 'Pedro',
    });
  });
});
