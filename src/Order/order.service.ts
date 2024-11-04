import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateOrderDto } from "./dto/create-order.dto";
import { Order } from "./entities/order.entity";
import { Equal, Like, Repository } from "typeorm";
import { FailureResponse, SuccessResponse } from "src/classes";
import { CreateProductRequestWithOrdersDto, CreateProductResponseWithOrdersDto } from "./DTO/create-product-with-orders.dto";
import { lastValueFrom, Observable } from "rxjs";
import { ClientGrpc } from "@nestjs/microservices";


interface ProductServiceClient {
  createProductWithOrders(data: CreateProductRequestWithOrdersDto): Observable<CreateProductResponseWithOrdersDto>;
}

@Injectable()
export class OrderService implements OnModuleInit{
  private productServiceClient: ProductServiceClient;

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @Inject('PRODUCT_PACKAGE') private client: ClientGrpc
  ) {}

  onModuleInit() {
    this.productServiceClient = this.client.getService<ProductServiceClient>('ProductService');
  }

  async create(createOrderDto: Partial<CreateOrderDto>): Promise<ResponseApi> {
    try {
      const order = await this.orderRepository.save(createOrderDto);

      return { ...new SuccessResponse(), data: order };
    } catch (error) {
      return { ...new FailureResponse(), error_message: error };
    }
  }

  async getAllOrders(limit?: number, offset?: number, clientCode?: number): Promise<ResponseApi> {
    try {
      const condition = clientCode ? {clientCode: Equal(clientCode)} : {}
      
      const obj = (limit == undefined || isNaN(limit)) && (offset == undefined || isNaN(offset)) ? {} : { take: limit || 10, skip: offset || 0 };

      const [count, orders] = await this.orderRepository.findAndCount({
        where: condition,
        ...obj,
      });

      return { ...new SuccessResponse(), data: { orders, count } };
    } catch (error) {
      return { ...new FailureResponse(), error_message: error };
    }
  }

  async getOrder(id: number): Promise<ResponseApi> {
    try {
      if (!id) {
        return { ...new FailureResponse(), error_message: "order id is required" };
      }
      const order = await this.orderRepository.findOne({where: {id}})
      return { ...new SuccessResponse(), data: order };
    } catch (error) {
      return { ...new FailureResponse(), error_message: error };
    }
  }

  async update(id: number, data: Partial<CreateOrderDto>): Promise<ResponseApi> {
    try {
      if (!id) {
        return { ...new FailureResponse(), error_message: "order id is required" };
      }
      await this.orderRepository.update(id, data);

      return { ...new SuccessResponse(), data: 'order Updated successfully' };

    } catch (error) {
      return { ...new FailureResponse(), error_message: error };
      
    }
  }

  async delete(id: number): Promise<ResponseApi> {
    try {
      if (!id) {
        return { ...new FailureResponse(), error_message: "order id is required" };
      }
      await this.orderRepository.softDelete(id);

      return { ...new SuccessResponse(), data: 'order Deleted successfully' };

    } catch (error) {
      return { ...new FailureResponse(), error_message: error };
      
    }
  }

  async createOrderWithProduct(productData: CreateProductRequestWithOrdersDto) : Promise<ResponseApi>{

    try {
      const productResponse = await lastValueFrom(this.productServiceClient.createProductWithOrders(productData));
      const orderDto = {
        clientCode: productResponse.clientCode,
        orderItems: [{
          productId: productResponse.productId,
          quantity: productResponse.quantity,
          unitPrice: productResponse.unitPrice
        }],
        totalAmount: productResponse.totalAmount,
        status: productResponse.status
  
      }
      const order = await this.orderRepository.save(orderDto);
      return { ...new SuccessResponse(), data: order };
    } catch (error) {
      return { ...new FailureResponse(), error_message: error };
    }

  }
  
}
