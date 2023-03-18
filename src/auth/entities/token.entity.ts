import { Role } from 'src/users/entities/role.entity';

export interface PayloadToken {
  role: Role;
  sub: number;
}
