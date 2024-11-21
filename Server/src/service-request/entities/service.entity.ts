// src/service-request/entities/service.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Customer } from 'src/customer/entities/customer.entity';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phoneModel: string;

  @Column()
  issue: string;

  @Column({ type: 'date' })
  serviceDate: string;

  @Column()
  status: string;

  // @ManyToOne(() => Customer, (customer) => customer.services)
  // customer: Customer;
}