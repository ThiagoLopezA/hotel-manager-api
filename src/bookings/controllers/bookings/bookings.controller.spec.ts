import { Test, TestingModule } from '@nestjs/testing';
import { BookingsController } from './bookings.controller';
import { BookingsService } from '../../services/bookings/bookings.service';

describe('BookingsController', () => {
  let controller: BookingsController;

  const mockBookings = [
    {
      id: 1,
      checkIn: '2023-02-01T10:00:00.000Z',
      checkOut: '2023-02-01T10:00:00.000Z',
      roomId: 1,
      stateId: 1,
    },
  ];
  const mockBookingsStates = [
    {
      id: 1,
      name: 'pendiente',
      bookings: [],
    },
  ];

  const mockBookingsService = {
    create: jest.fn((dto) => {
      return {
        ...dto,
        id: 2,
      };
    }),
    update: jest.fn((id, dto) => {
      const mock = mockBookings.find((b) => b.id === id);
      return { ...mock, ...dto };
    }),
    findAll: jest.fn(() => {
      return mockBookings;
    }),
    findOne: jest.fn((id) => {
      return mockBookings.find((b) => b.id === id);
    }),
    delete: jest.fn((id) => {
      return mockBookings.find((b) => b.id === id);
    }),

    createState: jest.fn((dto) => {
      return {
        ...dto,
        id: 2,
      };
    }),
    updateState: jest.fn((id, dto) => {
      const mock = mockBookingsStates.find((b) => b.id === id);
      return { ...mock, ...dto };
    }),
    findAllStates: jest.fn(() => {
      return mockBookingsStates;
    }),
    findOneState: jest.fn(({ id }) => {
      return mockBookingsStates.find((b) => b.id === id);
    }),
    deleteState: jest.fn((id) => {
      return mockBookingsStates.find((b) => b.id === id);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingsController],
      providers: [BookingsService],
    })
      .overrideProvider(BookingsService)
      .useValue(mockBookingsService)
      .compile();

    controller = module.get<BookingsController>(BookingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create method', () => {
    const newBooking = {
      checkIn: new Date(),
      checkOut: new Date(),
      roomId: 1,
      stateId: 1,
    };
    const newBookingState = {
      name: 'confirmada',
      bookings: [],
    };

    it('should create a booking', async () => {
      const result = await controller.create(newBooking);
      expect(result.data).toEqual({ ...newBooking, id: expect.any(Number) });
    });

    it('should create a booking state', async () => {
      const result = await controller.createState(newBookingState);
      expect(result.data).toEqual({
        ...newBookingState,
        id: expect.any(Number),
      });
    });
  });

  describe('Get all method', () => {
    it('should get all bookings', async () => {
      const result = await controller.getBookings();
      expect(result.data).toEqual(mockBookings);
    });
    it('should get all bookings states', async () => {
      const result = await controller.getBookingsStates();
      expect(result.data).toEqual(mockBookingsStates);
    });
  });

  describe('Get one methods', () => {
    it('should get one booking', async () => {
      const result = await controller.getBooking(1);
      expect(result.data).toEqual(mockBookings[0]);
    });
    it('should get one booking state', async () => {
      const result = await controller.getBookingState(1);
      expect(result.data).toEqual(mockBookingsStates[0]);
    });
  });

  describe('Update methods', () => {
    it('should update one booking', async () => {
      const result = await controller.update(1, { roomId: 2 });
      expect(result.data).toEqual({
        ...mockBookings[0],
        roomId: 2,
      });
    });
    it('should update one booking state', async () => {
      const result = await controller.updateState(1, { name: 'cancelado' });
      expect(result.data).toEqual({
        ...mockBookingsStates[0],
        name: 'cancelado',
      });
    });
  });

  describe('Delete methods', () => {
    it('should delete one booking', async () => {
      const result = await controller.delete(1);
      expect(result.data).toEqual(mockBookings[0]);
    });
    it('should delete one booking state', async () => {
      const result = await controller.deleteState(1);
      expect(result.data).toEqual(mockBookingsStates[0]);
    });
  });
});
