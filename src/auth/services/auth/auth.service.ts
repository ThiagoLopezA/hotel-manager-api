import { Injectable } from '@nestjs/common';
import { UsersService } from '../../../users/services/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { User } from '../../../users/entities/user.entity';
import { PayloadToken } from '../../entities/token.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user: User = await this.usersService.findOne({ email });
    console.log(user);
    const compare = await argon.verify(user.password, pass);
    if (user && compare) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  generateJWT(user: User) {
    const payload: PayloadToken = {
      role: user.role,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
