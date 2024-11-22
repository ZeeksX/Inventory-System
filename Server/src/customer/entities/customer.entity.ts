import { Entity, Column,PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ServiceRequest } from '../../service-request/entities/service-request.entity';
import { Order } from '../../order/entities/order.entity';  // Adjust the path according to your project structure

@Entity('customers')  // Specify the table name if necessary
export class Customer {
  @PrimaryGeneratedColumn()  // Add primary key
  id: number;  // Unique identifier for the customer

  @Column({ type: 'varchar', length: 255 })
  name: string;  // Name of the customer

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;  // Unique email address of the customer

  @Column({ type: 'varchar', length: 15, nullable: true })
  phone: string;  // Phone number of the customer (optional)

  @OneToMany(() => ServiceRequest, (serviceRequest) => serviceRequest.customer)
  serviceRequests: ServiceRequest[];  // Relationship to ServiceRequest entities

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];  // Relationship to Order entities
}