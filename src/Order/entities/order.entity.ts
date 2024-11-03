import { Entity, Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
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

  @Column({ type: "bigint", nullable: false }) product_id: number;

  @Column({ type: "float", nullable: false }) stock: number;

}
