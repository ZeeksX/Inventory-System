import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // Create a new order
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.create(createOrderDto);
  }

  // Get all orders
  @Get()
  async findAll() {
    return await this.orderService.findAll();
  }

  // Get a single order by ID
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.orderService.findOne(+id);
  }

  // Update an order by ID
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return await this.orderService.update(+id, updateOrderDto);
  }

  // Delete an order by ID
  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.orderService.remove(+id);
    return { message: `Order with ID ${id} deleted successfully` };
  }

  // Get total number of orders
  @Get('count')
  async getTotalOrders() {
    const count = await this.orderService.getTotalOrders();
    return { totalOrders: count };
  }
}
