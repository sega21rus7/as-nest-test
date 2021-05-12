import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) { }

  @Get()
  getAll() {
    return this.productService.getAll();
  }

  @UseInterceptors(FileInterceptor('image'))
  @Post()
  create(@Body() dto: CreateProductDto, @UploadedFile() image: any) {
    return this.productService.create(dto, image);
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.productService.get(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: CreateProductDto,
  ) {
    return this.productService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }

}
