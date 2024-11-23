// service-request.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ServiceRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerName: string;

  // @Column()
  // customerEmail: string;

  // @Column()
  // phoneNumber: string;

  @Column()
  phoneModel: string;

  @Column()
  issueDescription: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;
}
