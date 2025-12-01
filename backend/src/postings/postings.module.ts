import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

import { PostingsController } from './postings.controller';
import { PostingsService } from './postings.service';
import { Posting } from './entities/posting.entity';
import { Category } from '../categories/entities/category.entity';
import { Tag } from '../tags/entities/tag.entity';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads/postings', // folder untuk menyimpan file lokal
    }),
    TypeOrmModule.forFeature([Posting, Category, Tag]),
  ],
  controllers: [PostingsController],
  providers: [PostingsService],
})
export class PostingsModule {}
