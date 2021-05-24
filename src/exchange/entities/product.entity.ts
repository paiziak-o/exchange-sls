
import { Column, Entity, Index, PrimaryColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne } from 'typeorm';

import { Rate } from '../../rate/entities'

@Entity()
export class Product {
  @PrimaryColumn({
    generated: 'increment',
    type: 'bigint',
    unsigned: true,
  })
  @Index()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 10 })
  code: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 0 })
  views: number;

  @OneToOne(()=> Rate, rate => rate.product)
  rate

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}