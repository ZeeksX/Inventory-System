// src/controllers/order.controller.ts

import { Controller, Post, Body, Get } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() orderDto: OrderDto): Promise<Order> {
    return this.orderService.createOrder(orderDto);
  }

  @Get()
  async getAllOrders(): Promise<Order[]> {
    return this.orderService.getAllOrders();
  }
}