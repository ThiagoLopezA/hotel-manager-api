import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Floor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  number: number;
}
