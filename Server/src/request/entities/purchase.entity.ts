// purchase.entity.ts
import { Customer } from 'src/customer/entities/customer.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  itemToPurchase: string;

  @Column()
  quantity: number;

  @Column()
  totalCost: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ default: 'pending' }) // Default status is 'pending'
  status: string;

  @ManyToOne(() => Customer, (customer) => customer.purchases)
  customer: Customer; // Many-to-One relationship with Customer
}
