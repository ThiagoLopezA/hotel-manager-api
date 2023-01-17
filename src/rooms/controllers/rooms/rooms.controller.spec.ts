import { Test, TestingModule } from '@nestjs/testing';
import { RoomsService } from '../../services/rooms/rooms.service';
import { RoomsController } from './rooms.controller';

describe('RoomsController', () => {
  let controller: RoomsController;
  const mockCategories = [
    {
      id: 1,
      name: 'mockCategory',
      description: 'a mocked category',
      price: 666.66,
    },
  ];
  const mockRoomsService = {
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

  describe('Create category method', () => {
    it('should create a category', async () => {
      expect(await controller.createCategory(mockCategories[0])).toEqual(
        mockCategories[0],
      );
      expect(mockRoomsService.createCategory).toBeCalled();
    });
  });

  describe('Delete category method', () => {
    it('should delete a category', async () => {
      expect(await controller.deleteCategory(1)).toEqual(mockCategories[0]);
      expect(mockRoomsService.deleteCategory).toBeCalled();
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
});
