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

  @Column()
  checkin: Date;

  @Column()
  checkout: Date;

  @ManyToOne(() => Room, (room) => room.bookings)
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @ManyToOne(() => BookingState, (state) => state.bookings)
  @JoinColumn({ name: 'state_id' })
  state: BookingState;

  // client: Client;

  // billing: Billing;
}
