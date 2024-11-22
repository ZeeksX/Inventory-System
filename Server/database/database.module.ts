import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/customer/entities/customer.entity';
import { Product } from 'src/product/entities/product.entity';
import { Order } from 'src/order/entities/order.entity';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { StockLog } from 'src/stock-log/entities/stock-log.entity';
import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/user/user.entity';
import { Purchase } from 'src/request/entities/purchase.entity';
import { ServiceRequest } from 'src/request/entities/service-request.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // Load environment variables from .env file
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('DB_HOST'),
        port: +configService.getOrThrow('DB_PORT'), // The `+` ensures the value is converted to a number
        username: configService.getOrThrow('DB_USER'),
        password: configService.getOrThrow('DB_PASSWORD'),
        database: configService.getOrThrow('DB_NAME'),
        entities: [
          Customer,
          Product,
          Order,
          OrderItem,
          Supplier,
          StockLog,
          Category,
          User,
          Purchase,
          ServiceRequest,
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
