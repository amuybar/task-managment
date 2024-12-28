import { IsString } from 'class-validator';

export class BlogDto {
  @IsString()
  title: string;
  @IsString()
  slug: string;
  @IsString()
  body: string;
}
