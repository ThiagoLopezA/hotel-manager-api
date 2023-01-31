import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Room } from '../../rooms/entities/room.entity';
import { BookingState } from './booking-state.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', nullable: false })
  checkIn: Date;

  @Column({ type: 'timestamp', nullable: false })
  checkOut: Date;

  @ManyToOne(() => BookingState, (state) => state.bookings)
  @JoinColumn({ name: 'state_id' })
  state: BookingState;

  @ManyToOne(() => Room, (room) => room.bookings)
  @JoinColumn({ name: 'room_id' })
  room: Room;

  // client: Client;

  // billing: Billing;
}
