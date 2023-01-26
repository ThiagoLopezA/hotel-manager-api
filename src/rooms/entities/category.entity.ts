import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Room } from './room.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'float' })
  price: number;

  @OneToOne(() => Room)
  room: Room;
}
