import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TodoEntity } from 'src/Entity/todo.entity';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  controllers: [TodoController],
  providers: [TodoService],
  imports: [
    TypeOrmModule.forFeature([TodoEntity]),
    AuthModule
  ]
})
export class TodoModule {}
