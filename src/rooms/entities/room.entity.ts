import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Floor } from './floor.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', unique: true })
  number: number;

  @ManyToOne(() => Floor, (floor) => floor.rooms)
  floor: Floor;

  // @Column({ type: 'int' })
  // categoryId: number;
}
