import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './comments.model';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async getAllComments(): Promise<Comment[]> {
    return this.commentsService.getAllComments();
  }

  @Get(':id')
  async getComment(@Param('id') id: string): Promise<Comment> {
    const comment = await this.commentsService.getComment(id);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }

  @Post()
  async createComment(@Body() commentData: Comment): Promise<Comment> {
    try {
      console.log('Received commentData:', commentData); // Agregar este registro de depuración
      return await this.commentsService.createComment(commentData);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  @Put(':id')
  async updateComment(
    @Param('id') id: string,
    @Body() commentData: Comment,
  ): Promise<Comment> {
    if (!commentData.content) {
      throw new BadRequestException('Content is required to update a comment');
    }
    return this.commentsService.updateComment(id, commentData);
  }

  @Delete(':id')
  async deleteComment(@Param('id') id: string): Promise<void> {
    return this.commentsService.deleteComment(id);
  }
}
