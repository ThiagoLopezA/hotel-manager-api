import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', unique: true })
  number: number;

  @Column({ type: 'int' })
  floorId: number;

  @Column({ type: 'int' })
  categoryId: number;
}
