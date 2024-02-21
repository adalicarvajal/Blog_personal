import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Comment } from './comments.model';

@Injectable()
export class CommentsService {
  private comments: Comment[] = [];

  constructor() {}

  getAllComments(): Comment[] {
    return this.comments;
  }

  getComment(id: string): Comment | undefined {
    return this.comments.find((comment) => comment.id === id);
  }

  createComment(commentData: Comment): Comment {
    if (!commentData.content || !commentData.postsId) {
      throw new BadRequestException('Content and postsId are required');
    }

    const newComment: Comment = {
      id: uuidv4(),
      postsId: commentData.postsId,
      createdAt: new Date(),
      content: commentData.content,
    };

    this.comments.push(newComment);
    return newComment;
  }

  updateComment(id: string, commentData: Comment): Comment {
    const commentIndex = this.comments.findIndex((comment) => comment.id === id);
    if (commentIndex === -1) {
      throw new NotFoundException('Comment not found');
    }

    this.comments[commentIndex] = { ...this.comments[commentIndex], ...commentData };

    return this.comments[commentIndex];
  }

  deleteComment(id: string): void {
    this.comments = this.comments.filter((comment) => comment.id !== id);
  }
}
