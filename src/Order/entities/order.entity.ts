import { Client } from './../../../node_modules/@grpc/grpc-js/src/client';
import { Entity, Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderStatus } from "../order-status.enum";

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    nullable: false,
    select: true,
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  created_at: Date;

  @UpdateDateColumn({
    nullable: false,
    select: true,
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  updated_at: Date;

  @DeleteDateColumn({ nullable: false, select: true, type: "timestamp" })
  deleted_at: Date;

  @Column({ type: "bigint", nullable: false })
  ClientCode: number;

  @Column("jsonb")
  orderItems: { productId: string; quantity: number; unitPrice: number }[];

  @Column({ type: "decimal", precision: 12, scale: 2 })
  totalAmount: number;

  @Column({
    type: "enum",
    enum: OrderStatus,
    nullable: false,
    default: OrderStatus.PENDING,
  })
  status: string;
}
