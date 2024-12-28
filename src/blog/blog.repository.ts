import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Blog } from './blog.entity';
import { BlogDto } from './dto/blog.dto';

@Injectable()
export class BlogRepository extends Repository<Blog> {
  constructor(private dataSource: DataSource) {
    super(Blog, dataSource.createEntityManager());
  }

  async findBySlug(slug: string): Promise<Blog> {
    return this.findOne({ where: { slug } });
  }
  async createBlog(blogDto: BlogDto): Promise<Blog> {
    const { title, slug, body } = blogDto;
    const blog = new Blog();
    blog.title = title;
    blog.slug = slug;
    blog.body = body;
    return await this.save(blog);
  }
}
