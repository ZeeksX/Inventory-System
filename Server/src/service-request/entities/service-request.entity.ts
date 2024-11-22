import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Customer } from '../../customer/entities/customer.entity';  // Adjust the path according to your project structure
import { Product } from '../../product/entities/product.entity';

@Entity('service_requests')
export class ServiceRequest {
  @PrimaryGeneratedColumn()
  id: number;  // Unique identifier for the service request

  @Column({ type: 'varchar', length: 255 })
  description: string;  // Short description of the service request

  @Column({ type: 'text', nullable: true })
  details: string;  // Detailed information about the service request

  @Column({ type: 'enum', enum: ['pending', 'in-progress', 'completed'], default: 'pending' })
  status: string;  // Current status of the service request

  @ManyToOne(() => Customer, (customer) => customer.serviceRequests)
  @JoinColumn({ name: 'customer_id' })  // Foreign key in the service_requests table
  customer: Customer;  // Relationship to the Customer entity

  @ManyToOne(() => Product, (product) => product.serviceRequests)
  @JoinColumn({ name: 'product_id' })  // Foreign key in the service_requests table
  product: Product;  // Relationship to the Product entity
}