import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { userRole } from '../../enum/role.enum';
import { Customer } from 'src/customer/entities/customer.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: userRole, default: userRole.staff })
  role: userRole;

  @OneToOne(() => Customer, (customer) => customer.user)
  customer: Customer; // One-to-One relationship with Customer
}
