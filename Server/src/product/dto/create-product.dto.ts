import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  // @IsString()
  // sku: string;

  // @IsString()
  // description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock: number;

  @IsOptional()
  categoryId?: number;

  @IsOptional()
  supplierId?: number;
}
