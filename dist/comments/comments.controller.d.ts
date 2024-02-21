import { CommentsService } from './comments.service';
import { Comment } from './comments.model';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    getAllComments(): Promise<Comment[]>;
    getComment(id: string): Promise<Comment>;
    createComment(commentData: Comment): Promise<Comment>;
    updateComment(id: string, commentData: Comment): Promise<Comment>;
    deleteComment(id: string): Promise<void>;
}
