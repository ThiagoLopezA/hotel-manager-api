import { Booking } from 'src/bookings/entities/booking.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Category } from './category.entity';
import { Floor } from './floor.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', unique: true })
  number: number;

  @ManyToOne(() => Floor, (floor) => floor.rooms)
  floor: Floor;

  @ManyToOne(() => Category, (category) => category.rooms)
  category: Category;

  @OneToMany(() => Booking, (booking) => booking.room)
  bookings: Booking[];
}
