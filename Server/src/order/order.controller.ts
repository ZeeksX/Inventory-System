import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { OrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatus } from './entities/order.entity';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  /**
   * Create a new order
   */
  @Post()
  async createOrder(@Body() orderDto: OrderDto): Promise<Order> {
    return this.orderService.createOrder(orderDto);
  }

  /**
   * Get all orders
   */
  @Get()
  async getAllOrders(): Promise<Order[]> {
    return this.orderService.getAllOrders();
  }

  /**
   * Get an order by ID
   */
  @Get(':id')
  async getOrderById(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return this.orderService.getOrderById(id);
  }

  /**
   * Update an order by ID
   */
  @Patch(':id')
  async updateOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return this.orderService.updateOrder(id, updateOrderDto);
  }

  /**
   * Delete an order by ID
   */
  @Delete(':id')
  @HttpCode(204) // No content response on successful deletion
  async deleteOrder(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.orderService.deleteOrder(id);
  }

  /**
   * Update the status of an order
   */
  @Patch(':id/status')
  async updateOrderStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: OrderStatus,
  ): Promise<Order> {
    return this.orderService.updateOrderStatus(id, status);
  }

  /**
   * Get orders by status
   */
  @Get('status/:status')
  async getOrdersByStatus(
    @Param('status') status: OrderStatus,
  ): Promise<Order[]> {
    return this.orderService.getOrdersByStatus(status);
  }

  /**
   * Get total sales
   */
  @Get('sales/total')
  async getTotalSales(): Promise<number> {
    return this.orderService.getTotalSales();
  }

  /**
   * Get orders for a specific customer
   */
  @Get('customer/:customerId')
  async getOrdersByCustomer(
    @Param('customerId', ParseIntPipe) customerId: number,
  ): Promise<Order[]> {
    return this.orderService.getOrdersByCustomer(customerId);
  }
}
