import { Base } from 'src/common/entities/base.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';

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

  @BeforeInsert()
  @BeforeUpdate()
  lowercaseEmail() {
    this.email = this.email.toLowerCase();
  }
}
