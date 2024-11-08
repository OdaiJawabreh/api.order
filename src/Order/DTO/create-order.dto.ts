import { IsNumber, IsString, IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {

  @ApiProperty({
    example: 995,
    description: 'Identifier for the user placing the order',
  })
  @IsNotEmpty()
  @IsNumber()
  clientCode: number;

  @ApiProperty({
    description: 'List of products in the order',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        productId: { type: 'number', format: 'int', description: 'Identifier of the product' },
        quantity: { type: 'integer', description: 'Quantity of the product ordered' },
        unitPrice: { type: 'number', format: 'double', description: 'Price per unit at the time of order' },
      },
    },
  })
  orderItems: { productId: number; quantity: number; unitPrice: number }[];

  @ApiProperty({ description: 'Total cost of the order', example: 100.50 })
  totalAmount: number;

  @ApiProperty({ description: 'Status of the order', example: 'pending' })
  status: string;
}
