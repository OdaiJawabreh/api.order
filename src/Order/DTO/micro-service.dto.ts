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

  export class ProductDataResponse {
    id: number;
    name: string;
    description?: string;
    category: string;
    price: number;
    sku: string;
    stock: number
  }

  export class CreateOrderCheckAndUpdateProductRequest {
    clientCode: number;
    orderItems: Item[]  
  }
  
  export class CreateOrderCheckAndUpdateProductResponse {
    totalAmount: number;
    status: string;
    orderItems: Item[];
    clientCode: number;
  }
  
  
  export class Item {
    productId: number; 
    quantity: number;
    unitPrice: number
  }

  
  