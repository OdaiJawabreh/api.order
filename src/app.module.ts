import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './Order/order.module';

dotenv.config();
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER_NAME,
      password: process.env.DB_PASSWORD,
      poolSize: 1,
      database: process.env.DB_NAME,
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}