import { PartialType } from '@nestjs/mapped-types';
import { OrderDto } from './create-order.dto';
import { OrderStatus } from '../entities/order.entity';

export class UpdateOrderDto extends PartialType(OrderDto) {
  status?: OrderStatus; // Optional status update
}
