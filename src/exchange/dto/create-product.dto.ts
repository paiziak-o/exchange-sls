import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProduct {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  code: string;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  price: number;

  description: string;
}