import { Test, TestingModule } from '@nestjs/testing';
import { RoomsService } from '../../services/rooms/rooms.service';
import { RoomsController } from './rooms.controller';

describe('RoomsController', () => {
  let controller: RoomsController;

  const mockData = [
    {
      id: 1,
      number: 1,
      floor: {
        id: 1,
        number: 1,
      },
    },
    {
      id: 2,
      number: 2,
      floor: {
        id: 2,
        number: 2,
      },
    },
  ];

  const mockRoomsService = {
    create: jest.fn((dto) => ({ id: 3, ...dto })),
    findAll: jest.fn(() => mockData),
    findOne: jest.fn((id) => mockData.find((room) => room.id === id)),
    findOneBy: jest.fn((key) =>
      mockData.find((room) => room.number === key.number),
    ),
    update: jest.fn((room, dto) => {
      return { ...room, ...dto };
    }),
    delete: jest.fn(() => ({ affected: 1, raw: [] })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomsController],
      providers: [RoomsService],
    })
      .overrideProvider(RoomsService)
      .useValue(mockRoomsService)
      .compile();

    controller = module.get<RoomsController>(RoomsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create method', () => {
    it('should create a room', async () => {
      const body = { number: 4, floorId: 2 };
      const result = await controller.createRoom(body);
      expect(result.code).toEqual(201);
      expect(result.data).toEqual({
        id: expect.any(Number),
        number: body.number,
        floorId: body.floorId,
      });
      expect(mockRoomsService.create).toBeCalledWith(body);
    });
  });

  describe('Get All method', () => {
    it('should find all rooms', async () => {
      const result = await controller.getRooms();
      expect(result.data).toEqual(mockData);
      expect(mockRoomsService.findAll).toBeCalled();
    });
  });

  describe('Get One method', () => {
    it('should find one room by id', async () => {
      const result = await controller.getRoom(1);
      expect(result.data).toEqual(mockData[0]);
      expect(mockRoomsService.findOne).toBeCalledWith(1);
    });
  });

  describe('Update method', () => {
    it('should update one room by id', async () => {
      const room = mockData[0];
      const payload = { number: 10 };
      const result = await controller.updateRoom(room.id, payload);

      expect(result.data).toEqual({ ...room, ...payload });
      expect(mockRoomsService.findOne).toBeCalledWith(room.id);
      expect(mockRoomsService.update).toBeCalledWith(room, payload);
    });
  });

  describe('Delete method', () => {
    it('should delete one room by id', async () => {
      const room = mockData[0];
      const result = await controller.deleteRoom(room.id);
      expect(result.data).toEqual(room);
      expect(mockRoomsService.delete).toBeCalledWith(room.id);
    });
  });
});
