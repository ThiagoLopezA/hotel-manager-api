import { Test, TestingModule } from '@nestjs/testing';
import { FloorsService } from '../../services/floors/floors.service';
import { FloorsController } from './floors.controller';

describe('FloorsController', () => {
  let controller: FloorsController;

  const mockFloorsService = {
    create: jest.fn((dto) => {
      return {
        ...dto,
        id: 1,
      };
    }),
    update: jest.fn((number, dto) => {
      const mock = {
        number: 2,
        id: 1,
      };
      return { ...mock, ...dto };
    }),
    findAll: jest.fn(() => {
      return [
        {
          number: 1,
          id: 1,
        },
      ];
    }),
    findOne: jest.fn((id) => {
      return { id, number: 1 };
    }),
    delete: jest.fn((id) => {
      return { id, number: 1 };
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
        number: 1,
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
        number: 1,
      };
      expect(await controller.update(1, payload)).toEqual({
        number: payload.number,
        id: 1,
      });
      expect(mockFloorsService.update).toBeCalledWith(1, payload);
    });
  });

  describe('Get all method', () => {
    it('should get all floors', async () => {
      const mock = {
        number: 1,
        id: 1,
      };
      expect(await controller.findAll()).toEqual({ data: [mock] });
      expect(mockFloorsService.findAll).toBeCalled();
    });
  });

  describe('Get one method', () => {
    it('should get one floor', async () => {
      const mock = {
        number: 1,
        id: 1,
      };
      expect(await controller.findOne(1)).toEqual(mock);
      expect(mockFloorsService.findOne).toBeCalledWith(1);
    });
  });

  describe('Delete one method', () => {
    it('should delete one floor', async () => {
      expect(await controller.delete(1)).toEqual({ id: 1, number: 1 });
      expect(mockFloorsService.findOne).toBeCalledWith(1);
    });
  });
});
