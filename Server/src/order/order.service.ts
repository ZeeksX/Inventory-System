import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { OrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  /**
   * Create a new order
   */
  async createOrder(orderDto: OrderDto): Promise<Order> {
    const order = this.orderRepository.create({
      ...orderDto,
      orderDate: new Date(), // Use a Date object
      status: OrderStatus.Pending, // Set default status
    });

    return this.orderRepository.save(order);
  }

  /**
   * Get all orders
   */
  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['customer', 'orderItems'], // Include relations
    });
  }

  /**
   * Get an order by ID
   */
  async getOrderById(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['customer', 'orderItems'], // Include relations
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  /**
   * Update an order by ID
   */
  async updateOrder(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    const order = await this.getOrderById(id); // Ensure the order exists

    Object.assign(order, updateOrderDto);

    return this.orderRepository.save(order);
  }

  /**
   * Delete an order by ID
   */
  async deleteOrder(id: number): Promise<void> {
    const order = await this.getOrderById(id); // Ensure the order exists

    await this.orderRepository.remove(order);
  }

  /**
   * Update the status of an order
   */
  async updateOrderStatus(id: number, status: OrderStatus): Promise<Order> {
    const order = await this.getOrderById(id);

    if (!Object.values(OrderStatus).includes(status)) {
      throw new Error(`Invalid status: ${status}`);
    }

    order.status = status;
    return this.orderRepository.save(order);
  }

  /**
   * Get all orders by a specific status
   */
  async getOrdersByStatus(status: OrderStatus): Promise<Order[]> {
    return this.orderRepository.find({
      where: { status },
    });
  }

  /**
   * Get total sales (sum of all order prices)
   */
  async getTotalSales(): Promise<number> {
    const result = await this.orderRepository
      .createQueryBuilder('order')
      .select('SUM(order.totalPrice)', 'totalSales')
      .getRawOne();

    return result?.totalSales || 0; // Return 0 if no sales found
  }

  /**
   * Get orders for a specific customer
   */
  async getOrdersByCustomer(customerId: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: { customer: { id: customerId } },
      relations: ['customer', 'orderItems'], // Include relations
    });
  }
}
