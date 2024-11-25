/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { StockLog } from 'src/stock-log/entities/stock-log.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number; // Unique identifier for the product

  @Column()
  name: string; // Name of the product

  @Column('decimal', { precision: 10, scale: 2 })
  price: number; // Price of the product

  @Column()
  stock: number; // Current stock level of the product

  // @ManyToOne(() => Category, (category) => category.products)
  // category: Category; // Relationship to the Category entity

  @ManyToOne(() => Supplier, (supplier) => supplier.products)
  supplier: Supplier; // Relationship to the Supplier entity

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[]; // Relationship to OrderItem entities

  @OneToMany(() => StockLog, (stockLog) => stockLog.product)
  stockLogs: StockLog[]; // Relationship to StockLog entities
}
