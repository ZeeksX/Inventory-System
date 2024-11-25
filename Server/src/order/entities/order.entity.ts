import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Customer } from 'src/customer/entities/customer.entity';
import { OrderItem } from 'src/order-item/entities/order-item.entity';

export enum OrderStatus {
  Pending = 'Pending',
  Successful = 'Successful',
  Failed = 'Failed',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerName: string;

  @Column()
  item: string;

  @Column({ type: 'date' })
  orderDate: Date;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.Pending,
  })
  status: OrderStatus;

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice: number;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[]; // Join table for Many-to-Many relationship with Products
}
