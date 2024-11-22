// src/services/order.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async createOrder(orderDto: OrderDto): Promise<Order> {
    const order = this.orderRepository.create(orderDto);
    order.orderDate = new Date().toISOString().split('T')[0]; // Set the current date
    order.status = 'Pending'; // Set initial status
    return this.orderRepository.save(order);
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.find();
  }
}