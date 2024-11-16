import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  // Create a new order
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const newOrder = this.orderRepository.create(createOrderDto);
    return await this.orderRepository.save(newOrder);
  }

  // Get all orders
  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find();
  }

  // Get a single order by ID
  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  // Update an order by ID
  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);
    const updatedOrder = Object.assign(order, updateOrderDto);
    return await this.orderRepository.save(updatedOrder);
  }

  // Delete an order by ID
  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
  }

  // Get total number of orders
  async getTotalOrders(): Promise<number> {
    return await this.orderRepository.count();
  }
}
