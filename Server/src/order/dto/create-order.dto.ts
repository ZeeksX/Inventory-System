// src/dto/order.dto.ts

import { IsNotEmpty, IsString, IsEmail, IsDecimal } from 'class-validator';

export class OrderDto {
  @IsNotEmpty()
  @IsString()
  customerName: string;

  @IsNotEmpty()
  @IsEmail()
  customerEmail: string;

  @IsNotEmpty()
  @IsString()
  customerTel: string;

  @IsNotEmpty()
  @IsString()
  item: string; // Product name

  @IsNotEmpty()
  @IsDecimal()
  totalPrice: number; // Total price for the order
}