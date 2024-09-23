import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { SearchProductsDto } from './dto/search-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get('search')
  searchProducts(@Query() searchDto: SearchProductsDto) {
    const { query, page = 1, pageSize = 10 } = searchDto;
    return this.productService.searchProducts(
      query,
      page,
      pageSize,
    );
  }
}
