import { Test, TestingModule } from '@nestjs/testing';
import { RoomsService } from '../../services/rooms/rooms.service';
import { RoomsController } from './rooms.controller';

describe('RoomsController', () => {
  let controller: RoomsController;

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
  const mockCategories = [
    {
      id: 1,
      name: 'mockCategory',
      description: 'a mocked category',
      price: 666.66,
    },
  ];

  const mockRoomsService = {
    create: jest.fn((dto) => ({ id: 3, ...dto })),
    findAll: jest.fn(() => mockRooms),
    findOne: jest.fn((id) => mockRooms.find((room) => room.id === id)),
    findOneBy: jest.fn((key) =>
      mockRooms.find((room) => room.number === key.number),
    ),
    update: jest.fn((room, dto) => {
      return { ...room, ...dto };
    }),
    delete: jest.fn(() => ({ affected: 1, raw: [] })),
    createCategory: jest.fn((dto) => ({ ...dto, id: 1 })),
    findAllCategories: jest.fn(() => mockCategories),
    findOneCategory: jest.fn((id) => mockCategories.find((e) => e.id === id)),
    deleteCategory: jest.fn((id) => mockCategories.find((e) => e.id === id)),
    updateCategory: jest.fn((id, changes) => {
      const category = mockCategories.find((e) => e.id === id);
      return { ...category, ...changes };
    }),
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
      expect(result.data).toEqual(mockRooms);
      expect(mockRoomsService.findAll).toBeCalled();
    });
  });

  describe('Get One method', () => {
    it('should find one room by id', async () => {
      const result = await controller.getRoom(1);
      expect(result.data).toEqual(mockRooms[0]);
      expect(mockRoomsService.findOne).toBeCalledWith(1);
    });
  });

  describe('Update method', () => {
    it('should update one room by id', async () => {
      const room = mockRooms[0];
      const payload = { number: 10 };
      const result = await controller.updateRoom(room.id, payload);

      expect(result.data).toEqual({ ...room, ...payload });
      expect(mockRoomsService.findOne).toBeCalledWith(room.id);
      expect(mockRoomsService.update).toBeCalledWith(room, payload);
    });
  });

  describe('Delete method', () => {
    it('should delete one room by id', async () => {
      const room = mockRooms[0];
      const result = await controller.deleteRoom(room.id);
      expect(result.data).toEqual(room);
      expect(mockRoomsService.delete).toBeCalledWith(room.id);
    });
  });

  describe('Create category method', () => {
    it('should create a category', async () => {
      expect(await controller.createCategory(mockCategories[0])).toEqual(
        mockCategories[0],
      );
      expect(mockRoomsService.createCategory).toBeCalled();
    });
  });

  describe('Get all category method', () => {
    it('should get all categories', async () => {
      expect(await controller.getCategories()).toEqual(mockCategories);
      expect(mockRoomsService.findAllCategories).toBeCalled();
    });
  });

  describe('Get one category method', () => {
    it('should get one category', async () => {
      expect(await controller.getCategory(1)).toEqual(mockCategories[0]);
      expect(mockRoomsService.findOneCategory).toBeCalled();
    });
  });

  describe('Update category method', () => {
    it('should update a category', async () => {
      expect(
        await controller.updateCategory(1, {
          name: 'updatedCategory',
          description: 'an updated category',
          price: 999.99,
        }),
      ).toEqual({
        id: 1,
        name: 'updatedCategory',
        description: 'an updated category',
        price: 999.99,
      });
      expect(mockRoomsService.updateCategory).toBeCalled();
    });
  });

  describe('Delete category method', () => {
    it('should delete a category', async () => {
      expect(await controller.deleteCategory(1)).toEqual(mockCategories[0]);
      expect(mockRoomsService.deleteCategory).toBeCalled();
    });
  });
});
