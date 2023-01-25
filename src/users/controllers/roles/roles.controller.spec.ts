import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from '../../services/roles/roles.service';
import { RolesController } from './roles.controller';

describe('UserRolesController', () => {
  let controller: RolesController;

  const mockData = [{ name: 'administrator', id: 1 }];
  const mockRolesService = {
    create: jest.fn((dto) => {
      return {
        ...dto,
        id: 2,
      };
    }),
    update: jest.fn((id, dto) => {
      const mock = mockData.find((r) => r.id === id);
      return { ...mock, ...dto };
    }),
    findAll: jest.fn(() => {
      return mockData;
    }),
    findOne: jest.fn(({ id }) => {
      return mockData.find((u) => u.id === id);
    }),
    delete: jest.fn((id) => {
      return id;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [RolesService],
    })
      .overrideProvider(RolesService)
      .useValue(mockRolesService)
      .compile();

    controller = module.get<RolesController>(RolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create method', () => {
    it('should create a role', async () => {
      const payload = { name: 'user' };
      const result = await controller.create(payload);
      expect(result.data).toEqual({ ...payload, id: expect.any(Number) });
    });
  });

  describe('Update method', () => {
    it('should update a role', async () => {
      const payload = { name: 'newbie' };
      const result = await controller.update(1, payload);
      expect(result.data).toEqual({
        ...payload,
        id: expect.any(Number),
      });
    });
  });

  describe('Get all method', () => {
    it('should get all roles', async () => {
      const result = await controller.findAll();
      expect(result.data).toEqual(mockData);
    });
  });

  describe('Get one method', () => {
    it('should get one role', async () => {
      const result = await controller.findOne(1);
      expect(result.data).toEqual(mockData[0]);
    });
  });

  describe('Delete one method', () => {
    it('should delete one role', async () => {
      const result = await controller.delete(1);
      expect(result.code).toEqual(200);
    });
  });
});
