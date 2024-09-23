import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductInformation } from './product-information.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => ProductInformation, (translation) => translation.product, {
    cascade: true,
  })
  translations: ProductInformation[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
