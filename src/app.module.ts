import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product/entities/product.entity';
import { ProductInformation } from './product/entities/product-information.entity';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // Assuming PostgreSQL
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'postgres',
      synchronize: true, // For development only, it syncs DB schema
      entities: [Product, ProductInformation], // Explicitly list entities
    }),
    ProductModule,
  ],
})
export class AppModule {}
