import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/user.entity';
import { Order } from 'src/order/entities/order.entity';
import { Purchase } from '../../request/entities/purchase.entity';
import { ServiceRequest } from '../../request/entities/service-request.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  user: User; // One-to-One relationship with User

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[]; // One-to-Many relationship with Orders

  @OneToMany(() => Purchase, (purchase) => purchase.customer)
  purchases: Purchase[]; // One-to-Many relationship with Purchases

  @OneToMany(() => ServiceRequest, (serviceRequest) => serviceRequest.customer)
  serviceRequests: ServiceRequest[]; // One-to-Many relationship with ServiceRequests
}
