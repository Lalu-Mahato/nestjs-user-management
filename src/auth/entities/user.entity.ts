import { Base } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class User extends Base {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  mobileNumber: string;

  @Column({ default: true })
  status: boolean;
}
