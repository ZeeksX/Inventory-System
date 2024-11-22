// purchase.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
