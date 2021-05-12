import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilesService } from 'src/files/files.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product, ProductDocument } from './product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
    private filesService: FilesService,
  ) { }

  async getAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }
  async create(dto: CreateProductDto, image: any): Promise<Product> {
    const imageName = await this.filesService.createFile(image);
    const p = new this.productModel({ ...dto, image: imageName });
    return p.save();
  }
  async get(_id: string) {
    return this.productModel.findOne({ _id });
  }
  async update(_id: string, dto: CreateProductDto) {
    return this.productModel.updateOne({ _id }, dto);
  }
  async delete(_id: string) {
    return this.productModel.deleteOne({ _id });
  }
}
