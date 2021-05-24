import { Controller, Get, Post, Delete, Body, Param, Query, NotFoundException } from '@nestjs/common';

import { CreateProduct } from '../../dto';
import {
  AddProductService,
  GetProductsService,
  GetProductService,
  DeleteProductService,
  GetTopProductsService,
} from '../../services';
import { UpdateRateService } from '../../../rate/services/update-rate/update-rate.service';
import { Product } from '../../entities';

@Controller('products')
export class ProductsController {
  constructor (
    private readonly addProductService: AddProductService,
    private readonly getProductsService: GetProductsService,
    private readonly getProductService: GetProductService,
    private readonly deleteProductService: DeleteProductService,
    private readonly getTopProductsService: GetTopProductsService,
    private readonly updateRateService: UpdateRateService,
  ) { }

  @Get()
  async index(): Promise<Product[]> {
    await this.updateRateService.massUpdateCatched();
    return this.getProductsService.load();
  }

  @Post()
  addProduct(@Body() product: CreateProduct): Promise<Product> {
    return this.addProductService.save(product);
  }

  @Delete(':code')
  deleteProduct(@Param('code') code: string): Promise<number> {

    return this.deleteProductService.delete(code);
  }

  @Get('top')
  async getTopProduct(@Query() query): Promise<Product[]> {
    await this.updateRateService.massUpdateCatched();

    return this.getTopProductsService.load(query.limit, query.quote);
  }

  @Get(':code')
  async getProductByCode(
    @Param('code') code: string,
    @Query('quote') quote: string,
  ): Promise<Product> {
    await this.updateRateService.massUpdateCatched();
    const product = await this.getProductService.load(code, quote);

    if (!product) throw new NotFoundException();

    return product;
  }
}
