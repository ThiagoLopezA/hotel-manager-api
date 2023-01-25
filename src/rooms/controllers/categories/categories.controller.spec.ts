import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from '../../services/categories/categories.service';
import { RoomCategory } from '../../entities/room-category.entity';

describe('CategoriesController', () => {
  let controller: CategoriesController;

  const mockCategories = [
    {
      id: 1,
      name: 'mockCategory',
      description: 'a mocked category',
      price: 666.66,
    },
  ];
  const mockCategoriesService = {
    create: jest.fn((dto) => ({ ...dto, id: 2 })),
    findAll: jest.fn(() => mockCategories),
    findOne: jest.fn((id) => mockCategories.find((e) => e.id === id)),
    findOneBy: jest.fn((obj) => {
      console.log(obj);
      const found = mockCategories.find((e) => e.name === obj.name);
      console.log(found);
      return found;
    }),
    delete: jest.fn((id) => mockCategories.find((e) => e.id === id)),
    update: jest.fn((id, changes) => {
      const category = mockCategories.find((e) => e.id === id);
      return { ...category, ...changes };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [CategoriesService],
    })
      .overrideProvider(CategoriesService)
      .useValue(mockCategoriesService)
      .compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create method', () => {
    it('should create a category', async () => {
      const newCategory: RoomCategory = {
        id: 2,
        name: 'B',
        description: 'bla',
        price: 100,
      };
      const result = await controller.createCategory(newCategory);
      expect(result.data).toEqual(newCategory);
      expect(result.code).toEqual(201);
      expect(mockCategoriesService.create).toBeCalled();
    });
  });

  describe('Get all method', () => {
    it('should get all categories', async () => {
      const result = await controller.getCategories();
      expect(result.data).toEqual(mockCategories);
      expect(mockCategoriesService.findAll).toBeCalled();
    });
  });

  describe('Get one method', () => {
    it('should get one category', async () => {
      const result = await controller.getCategory(1);
      expect(result.data).toEqual(mockCategories[0]);
      expect(mockCategoriesService.findOne).toBeCalled();
    });
  });

  describe('Update method', () => {
    it('should update a category', async () => {
      const result = await controller.updateCategory(1, {
        name: 'updatedCategory',
        description: 'an updated category',
        price: 999.99,
      });
      expect(result.data).toEqual({
        id: 1,
        name: 'updatedCategory',
        description: 'an updated category',
        price: 999.99,
      });
      expect(mockCategoriesService.update).toBeCalled();
    });
  });

  describe('Delete method', () => {
    it('should delete a category', async () => {
      const result = await controller.deleteCategory(1);
      expect(result.data).toEqual(mockCategories[0]);
      expect(mockCategoriesService.delete).toBeCalled();
    });
  });
});
