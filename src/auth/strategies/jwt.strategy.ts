import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { jwtConstants } from '../constants/auth.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload): Promise<User> {
    const { email } = payload;
    const user: User = await this.usersRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.email'])
      .where('LOWER(user.email) = LOWER(:email)', {
        email: email.toLowerCase(),
      })
      .getOne();

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
