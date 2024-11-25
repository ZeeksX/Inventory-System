import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { StockLogModule } from './stock-log/stock-log.module';
import { CategoryModule } from './category/category.module';
import { SupplierModule } from './supplier/supplier.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { CustomerModule } from './customer/customer.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from 'database/database.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RequestModule } from './request/request.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load environment variables
    DatabaseModule,
    ProductModule,
    StockLogModule,
    CategoryModule,
    SupplierModule,
    OrderModule,
    OrderItemModule,
    CustomerModule,
    RequestModule,
    UserModule,
    SupplierModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Use the secret from the environment variable
      signOptions: { expiresIn: '60s' }, // Set token expiration time as needed
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
