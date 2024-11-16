import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // Create a new product
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  // Get all products with optional filtering
  async findAll(categoryId?: number, supplierId?: number): Promise<Product[]> {
    const query = this.productRepository.createQueryBuilder('product');

    if (categoryId) {
      query.andWhere('product.categoryId = :categoryId', { categoryId });
    }

    if (supplierId) {
      query.andWhere('product.supplierId = :supplierId', { supplierId });
    }

    return query.getMany();
  }

  // Get a single product by ID
  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  // Update a product
  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);

    Object.assign(product, updateProductDto); // Merge new data
    return this.productRepository.save(product);
  }

  // Delete a product
  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }

  // Get total number of products
  async getTotalCount(): Promise<number> {
    return this.productRepository.count();
  }

  // Get products with low stock
  async getLowStockProducts(threshold: number = 5): Promise<Product[]> {
    return this.productRepository
      .createQueryBuilder('product')
      .where('product.stock < :threshold', { threshold })
      .getMany();
  }
}
