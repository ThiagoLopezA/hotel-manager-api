import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class RoomCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'float' })
  price: number;
}
