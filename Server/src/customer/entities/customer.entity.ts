// src/customer/entities/customer.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from 'src/order/entities/order.entity';
import { Service } from 'src/service-request/entities/service.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  address?: string;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];

  // @OneToMany(() => Service, (service) => service.customer)
  // services: Service[];
}