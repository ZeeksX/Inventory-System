import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { Customer } from './entities/customer.entity'; // Adjust the path as necessary

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]), // Register the Customer entity
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}