import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
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

  @OneToOne(() => Category)
  @JoinColumn()
  category: Category;
}
