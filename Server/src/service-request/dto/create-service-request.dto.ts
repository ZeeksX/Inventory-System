import { IsString, IsOptional } from 'class-validator';

export class CreateServiceRequestDto {
  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  details?: string;
}