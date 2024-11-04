export class CreateProductRequestWithOrdersDto {
    name: string;
    description?: string;
    category: string;
    sku: string;
    price: number;
    stock: number;
    clientCode: number;
    quantity: number;
  }

  export class CreateProductResponseWithOrdersDto {
    clientCode: number;
    productId: number;
    quantity: number;
    unitPrice: number;
    totalAmount: number;
    status: string;
  }
  
  