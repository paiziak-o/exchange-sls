
import {
  Column,
  Entity,
  Index,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from '../../exchange/entities';

@Entity()
export class Rate {
  @PrimaryColumn({
    generated: 'increment',
    type: 'bigint',
    unsigned: true,
  })
  @Index()
  id: number;

  @Column({ default: 0, type: 'float' })
  usd: number;

  @Column({ default: 0, type: 'float' })
  cad: number;

  @Column({ default: 0, type: 'float' })
  eur: number;

  @Column({ default: 0, type: 'float' })
  gbp: number;

  @OneToOne(() => Product, {
    eager: true,
    cascade: ['soft-remove',],
  })
  @JoinColumn()
  product: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}