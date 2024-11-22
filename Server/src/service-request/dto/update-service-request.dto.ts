import { IsString, IsOptional } from 'class-validator';

export class UpdateServiceRequestDto {
  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  details?: string;
}