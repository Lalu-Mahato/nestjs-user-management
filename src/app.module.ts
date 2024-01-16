import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'usersdb',
      username: 'postgres',
      password: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    CommonModule,
  ],
})
export class AppModule {}
