import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';

import * as argon from 'argon2';
import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @OneToOne(() => Role, (role) => role.users)
  @JoinColumn()
  role: Role;

  @BeforeInsert()
  async hashPassword() {
    const text = this.password;
    this.password = await argon.hash(text, {
      type: argon.argon2id,
    });
  }
}
