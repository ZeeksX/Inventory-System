import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Customer } from 'src/customer/entities/customer.entity';
import { OrderItem } from 'src/order-item/entities/order-item.entity';

@Entity('orders')  // Specify the table name if necessary
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  orderDate: string;

  @Column()
  status: string;

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice: number;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];
}