import { User } from '../entities/user.entity';

export type LoginResponse = {
  user: User;
  accessToken: string;
};

export interface TokenPayload {
  sub: number;
  email: string;
}
