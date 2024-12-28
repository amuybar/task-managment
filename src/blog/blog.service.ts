import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogRepository } from './blog.repository';
import { BlogDto } from './dto/blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogRepository) private blogRepo: BlogRepository,
  ) {}

  createBlog(blogDto: BlogDto) {
    return this.blogRepo.createBlog(blogDto);
  }

  findAll() {
    return this.blogRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} blog`;
  }

  update(id: number) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
