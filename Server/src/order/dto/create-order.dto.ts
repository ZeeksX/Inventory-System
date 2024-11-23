import { IsNotEmpty, IsString, IsDecimal, IsDate, IsIn } from 'class-validator';

export class OrderDto {
  @IsNotEmpty()
  @IsString()
  customerName: string;

  @IsNotEmpty()
  @IsDate()
  orderDate: Date;

  @IsNotEmpty()
  @IsString()
  @IsIn(['Pending', 'Successful', 'Failed'], {
    message: 'Status must be either Pending, Successful, or Failed',
  })
  status: string;

  @IsNotEmpty()
  @IsString()
  item: string; // Product name

  @IsNotEmpty()
  @IsDecimal()
  totalPrice: number; // Total price for the order
}
