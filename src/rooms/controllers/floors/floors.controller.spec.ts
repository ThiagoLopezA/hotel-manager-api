import { Test, TestingModule } from '@nestjs/testing';
import { FloorsService } from '../../services/floors/floors.service';
import { FloorsController } from './floors.controller';

describe('FloorsController', () => {
  let controller: FloorsController;

  const mockData = [
    {
      number: 1,
      id: 1,
    },
  ];

  const mockFloorsService = {
    create: jest.fn((dto) => {
      return {
        ...dto,
        id: 2,
      };
    }),
    update: jest.fn((number, dto) => {
      const mock = mockData.find((f) => f.number === number);
      return { ...mock, ...dto };
    }),
    findAll: jest.fn(() => {
      return mockData;
    }),
    findOne: jest.fn(({ id }) => {
      return mockData.find((f) => f.id === id);
    }),
    delete: jest.fn((id) => {
      return { affected: 1, raw: [] };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FloorsController],
      providers: [FloorsService],
    })
      .overrideProvider(FloorsService)
      .useValue(mockFloorsService)
      .compile();

    controller = module.get<FloorsController>(FloorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create method', () => {
    it('should create a floor', async () => {
      const payload = {
        number: 2,
      };
      expect(await controller.create(payload)).toEqual({
        number: payload.number,
        id: expect.any(Number),
      });
      expect(mockFloorsService.create).toBeCalledWith(payload);
    });
  });

  describe('Update method', () => {
    it('should update a floor', async () => {
      const payload = {
        number: 3,
      };
      expect(await controller.update(1, payload)).toEqual({
        number: payload.number,
        id: expect.any(Number),
      });
      expect(mockFloorsService.update).toBeCalledWith(1, payload);
    });
  });

  describe('Get all method', () => {
    it('should get all floors', async () => {
      expect(await controller.findAll()).toEqual(mockData);
      expect(mockFloorsService.findAll).toBeCalled();
    });
  });

  describe('Get one method', () => {
    it('should get one floor', async () => {
      expect(await controller.findOne(1)).toEqual(mockData[0]);
      expect(mockFloorsService.findOne).toBeCalledWith({ id: 1 });
    });
  });

  describe('Delete one method', () => {
    it('should delete one floor', async () => {
      expect(await controller.delete(1)).toEqual({ affected: 1, raw: [] });
      expect(mockFloorsService.delete).toBeCalledWith(1);
    });
  });
});
