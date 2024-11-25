import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateSupplierDto {
  @IsString()
  name: string;

  @IsString()
  contactName: string;

  @IsEmail()
  contactEmail: string;

  @IsString()
  deliverySchedule: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  address?: string;
}
