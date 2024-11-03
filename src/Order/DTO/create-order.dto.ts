import { IsNumber, IsString, IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {

  @ApiProperty({
    example: 1,
    description: 'The Id Of Product From Product Service',
  })
  @IsNotEmpty()
  @IsNumber()
  product_id: number;

  @ApiProperty({
    example: 9,
    description: 'How Much product I have',
  })
  @IsNotEmpty()
  @IsNumber()
   quantity: number;
}
