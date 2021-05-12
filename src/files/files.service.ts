import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  async createFile(file: any): Promise<string> {
    try {
      const ext = path.extname(file.originalname);
      const fileName = uuid.v4() + ext;
      const filePath = path.join(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      await fs.promises.writeFile(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (err) {
      throw new HttpException(
        `Ошибка при сохранении изображения ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
