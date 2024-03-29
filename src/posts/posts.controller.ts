import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, BadRequestException, InternalServerErrorException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../jwt-auth.guard'; // Importa tu guardia JWT
import { PostsService } from './posts.service';
import { Post as PostModel } from './post.model';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAllPosts(): Promise<PostModel[]> {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  async getPost(@Param('id') id: string): Promise<PostModel> {
    const post = await this.postsService.getPost(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  @Post()
  @UseGuards(JwtAuthGuard) // Aplica la guardia JWT a este endpoint
  async createPost(@Body() postData: PostModel): Promise<PostModel> {
    try {
      console.log('Received postData:', postData);
      return await this.postsService.createPost(postData);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard) // Aplica la guardia JWT a este endpoint
  async updatePost(
    @Param('id') id: string,
    @Body() postData: PostModel,
  ): Promise<PostModel> {
    if (!postData.title && !postData.content) {
      throw new BadRequestException(
        'At least one of title or content must be provided',
      );
    }
    return this.postsService.updatePost(id, postData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard) // Aplica la guardia JWT a este endpoint
  async deletePost(@Param('id') id: string): Promise<void> {
    return this.postsService.deletePost(id);
  }
}
