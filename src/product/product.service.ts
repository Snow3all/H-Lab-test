import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductInformation } from './entities/product-information.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(ProductInformation)
    private ProductInformationRepository: Repository<ProductInformation>,
  ) {}

  async create(createProductDto: any): Promise<Product> {
    const product = new Product();
    await this.productRepository.save(product);

    const productInform = Object.keys(createProductDto.name).map((lang) => {
      const information = new ProductInformation();
      information.languageCode = lang;
      information.name = createProductDto.name[lang];
      information.description = createProductDto.description?.[lang];
      information.product = product;
      return information;
    });

    await this.ProductInformationRepository.save(productInform);
    return product;
  }

  async searchProducts(
    query: string,
    page: number,
    pageSize: number,
  ) {
    const qb = this.ProductInformationRepository
      .createQueryBuilder('translation')
      .leftJoinAndSelect('translation.product', 'product')
      .where('translation.name ILIKE :query', { query: `%${query}%` });
    const totalItems = await qb.getCount();
    const products = await qb
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getMany();

    return {
      currentPage: page,
      pageSize,
      totalItems,
      totalPages: Math.ceil(totalItems / pageSize),
      data: products,
    };
  }
}
