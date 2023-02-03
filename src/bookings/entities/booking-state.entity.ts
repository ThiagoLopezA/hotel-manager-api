import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Booking } from './booking.entity';

@Entity()
export class BookingState {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Booking, (booking) => booking.state)
  bookings: Booking[];
}
