import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateOrderDto } from "./dto/create-order.dto";
import { Order } from "./entities/order.entity";
import { Equal, Like, Repository } from "typeorm";
import { FailureResponse, SuccessResponse } from "src/classes";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) {}

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
  
}
