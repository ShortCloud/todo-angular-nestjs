import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.decorator';
import { CreateTodoDTO } from 'src/DTO/create-todo.dto';
import { TodoStatus } from 'src/Entity/todo.entity';
import { UserEntity } from 'src/Entity/user.entity';
import { TodoStatusValidationPipe } from 'src/pipes/TodoStatusValidation.pipe';
import { TodoService } from './todo.service';

@Controller('todos')
@UseGuards(AuthGuard())
export class TodoController {

  constructor(private todoService: TodoService) {}

  @Get()
  getAllTodos(
    @User() user: UserEntity
  ) {
    return this.todoService.getAllTodos(user);
  }

  @Post()
  createNewTodo(
    @Body(ValidationPipe) data: CreateTodoDTO,
    @User() user: UserEntity
  ) {
    return this.todoService.createTodo(data, user);
  }

  @Patch(':id')
  updateTodo(
    @Body('status', TodoStatusValidationPipe) status: TodoStatus,
    @Param('id') id: number,
    @User() user: UserEntity
  ) {
    return this.todoService.update(id, status, user);
  }

  @Delete(':id')
  deleteTodo(
    @Param('id') id: number,
    @User() user: UserEntity
    ) {
    return this.todoService.delete(id, user);
  }

}
