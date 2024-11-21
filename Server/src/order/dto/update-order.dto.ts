import { PartialType } from '@nestjs/mapped-types';
import { OrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(OrderDto) {}
