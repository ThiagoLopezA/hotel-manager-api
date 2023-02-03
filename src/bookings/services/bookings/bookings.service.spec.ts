import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BookingsService } from './bookings.service';
import { Booking } from '../../entities/booking.entity';
import { BookingState } from '../../entities/booking-state.entity';
import { Room } from '../../../rooms/entities/room.entity';

describe('BookingsService', () => {
  let service: BookingsService;

  const mockBooking = [
    { id: 1, checkIn: new Date(), checkOut: new Date(), roomId: 1, stateId: 1 },
  ];
  const mockBookingState = [{ id: 1, name: 'pendiente', bookings: [] }];
  const mockRooms = [
    { id: 1, number: 1, floor: { id: 1, number: 1 } },
    { id: 2, number: 2, floor: { id: 1, number: 1 } },
  ];

  const mockBookingsRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((dto) => Promise.resolve({ id: 2, ...dto })),
    find: jest.fn().mockImplementation(() => mockBooking),
    findOne: jest.fn().mockImplementation(({ where: { id } }) => {
      return mockBooking.find((e) => e.id === id);
    }),
    delete: jest
      .fn()
      .mockImplementation((id) => mockBooking.find((e) => e.id === id)),
    merge: jest.fn().mockImplementation((object, changes) => ({
      ...object,
      ...changes,
    })),
  };
  const mockBookingsStatesRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((dto) => Promise.resolve({ id: 2, ...dto })),
    find: jest.fn().mockImplementation(() => mockBookingState),
    findOne: jest
      .fn()
      .mockImplementation(({ where: { id } }) =>
        mockBookingState.find((e) => e.id === id),
      ),
    delete: jest.fn().mockImplementation((id) => {
      return mockBookingState.find((e) => e.id === id);
    }),
    merge: jest.fn().mockImplementation((object, changes) => ({
      ...object,
      ...changes,
    })),
  };
  const mockRoomsRepository = {
    findOne: jest
      .fn()
      .mockImplementation(({ where: { id } }) =>
        mockRooms.find((r) => r.id === id),
      ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsService,
        {
          provide: getRepositoryToken(Booking),
          useValue: mockBookingsRepository,
        },
        {
          provide: getRepositoryToken(BookingState),
          useValue: mockBookingsStatesRepository,
        },
        {
          provide: getRepositoryToken(Room),
          useValue: mockRoomsRepository,
        },
      ],
    }).compile();

    service = module.get<BookingsService>(BookingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Bookings', () => {
    it('should create a new booking and return it', async () => {
      expect(await service.create(mockBooking[0])).toEqual(mockBooking[0]);
    });

    it('should find all bookings', async () => {
      expect(await service.findAll()).toEqual(mockBooking);
    });

    it('should find one booking by id', async () => {
      expect(await service.findOne(1)).toEqual(mockBooking[0]);
    });

    it('should update a booking and return it', async () => {
      expect(await service.update(1, { roomId: 2 })).toEqual(mockBooking[0]);
    });

    it('should delete a booking and return it', async () => {
      expect(await service.delete(1)).toEqual(mockBooking[0]);
    });
  });

  describe('Bookings states', () => {
    it('should create a new booking state and return it', async () => {
      expect(await service.createState(mockBookingState[0])).toEqual(
        mockBookingState[0],
      );
    });

    it('should find all bookings states', async () => {
      expect(await service.findAllStates()).toEqual(mockBookingState);
    });

    it('should find one booking state by id', async () => {
      expect(await service.findOneState({ id: 1 })).toEqual(
        mockBookingState[0],
      );
    });

    it('should update a booking state and return it', async () => {
      expect(await service.updateState(1, { name: 'confirmado' })).toEqual(
        mockBookingState[0],
      );
    });

    it('should delete a booking state and return it', async () => {
      expect(await service.deleteState(1)).toEqual(mockBookingState[0]);
    });
  });
});
