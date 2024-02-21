import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module'; // Importa el módulo de posts
import { CommentsModule } from './comments/comments.module'; // Importa el módulo de comentarios
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [PostsModule, CommentsModule, AuthModule], // Importa el módulo de posts
})
export class AppModule {}
