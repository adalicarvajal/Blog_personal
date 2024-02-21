import { Comment } from './comments.model';
export declare class CommentsService {
    private comments;
    constructor();
    getAllComments(): Comment[];
    getComment(id: string): Comment | undefined;
    createComment(commentData: Comment): Comment;
    updateComment(id: string, commentData: Comment): Comment;
    deleteComment(id: string): void;
}
