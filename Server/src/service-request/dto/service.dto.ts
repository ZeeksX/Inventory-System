// src/dto/service.dto.ts

import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class ServiceDto {
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
  phoneModel: string;

  @IsNotEmpty()
  @IsString()
  issue: string;
}