import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from '../../order/entities/order.entity'; // Adjust the path according to your project structure
import { User } from '../../user/user.entity'; // Adjust path accordingly

@Entity('customers') // Specify the table name
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  phone: string;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];

  @OneToOne(() => User, { cascade: true }) // Cascade ensures User is automatically persisted
  @JoinColumn() // Specifies the owning side of the relationship
  user: User;
}
