import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { CreateOrderCheckAndUpdateProductRequest, CreateProductRequestWithOrdersDto } from "./DTO/micro-service.dto";


@Controller("order")
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    async createOrder(@Body() createOrderDto: Partial<CreateOrderDto>) {
      return this.orderService.create(createOrderDto);
    }

    @Get()
    getAllProducts(
      @Query('limit') limit?: number,
      @Query('offset') offset?: number,
      @Query('clientCode') clientCode?: number,
    ){
      return this.orderService.getAllOrders(limit, offset, +clientCode);
    }
  
    @Get('/:id')
    getOrder(
      @Param('id') id: string,
    ){
      return this.orderService.getOrder(+id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() createProductDto: Partial<CreateOrderDto>) {
      return this.orderService.update(+id, createProductDto);
    }
  
    @Delete(':id')
    delete(@Param('id') id: string) {
      return this.orderService.delete(+id);
    };

    @Post('create-with-product')
    async createOrderWithProduct(@Body() productData: CreateProductRequestWithOrdersDto) {
      return this.orderService.createOrderWithProduct(productData);
    }

    @Get('/details/orders')
    async getOrderWithDetails() {
      return this.orderService.getOrderWithDetails();
    }

    @Post('/check-product/orders')
    async createOrderWithCheckProductsAndUpdateIt(@Body() orders: CreateOrderCheckAndUpdateProductRequest) {
      return this.orderService.createOrderWithCheckDetails(orders);
    }
}
