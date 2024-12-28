import { Body, Controller, Get, Post } from '@nestjs/common';
import { BlogService } from './blog.service';
import { Blog } from './blog.entity';
import { BlogDto } from './dto/blog.dto';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  getBlogs(): Promise<Blog[]> {
    return this.blogService.findAll();
  }
  @Post()
  createBlog(@Body() blogDto: BlogDto): Promise<Blog> {
    return this.blogService.createBlog(blogDto);
  }
}
