import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'products',
          protoPath: join(__dirname, '../protos/product.proto'),
          url: 'localhost:50051',
        },
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],

})
export class OrderModule {}
