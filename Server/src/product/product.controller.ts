import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Create a new product
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  // Get all products with optional filters
  @Get()
  async findAll(
    @Query('categoryId') categoryId?: number,
    @Query('supplierId') supplierId?: number,
  ) {
    return this.productService.findAll(categoryId, supplierId);
  }

  // Get a single product by ID
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  // Update a product
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  // Delete a product
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.productService.remove(id);
  }

  // Get total number of products
  @Get('count/total')
  async getTotalCount() {
    return { total: await this.productService.getTotalCount() };
  }

  // Get products with low stock
  @Get('low-stock')
  async getLowStockProducts(@Query('threshold') threshold: number = 5) {
    return this.productService.getLowStockProducts(threshold);
  }
}
