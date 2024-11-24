// service-request.entity.ts
import { Customer } from 'src/customer/entities/customer.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class ServiceRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerName: string;

  @Column()
  phoneModel: string;

  @Column()
  issueDescription: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ default: 'pending' }) // Default status is 'pending'
  status: string;

  @ManyToOne(() => Customer, (customer) => customer.serviceRequests)
  customer: Customer; // Many-to-One relationship with Customer
}
