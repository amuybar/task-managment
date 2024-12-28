import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './blog.entity';
import { BlogRepository } from './blog.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Blog])],
  providers: [BlogService, BlogRepository],
  controllers: [BlogController],
})
export class BlogModule {}
