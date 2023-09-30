import { IsNotEmpty } from "class-validator";
import { IsOptional, Length, MaxLength } from "class-validator/types/decorator/decorators";

export class CreateTodoDTO {
  @IsNotEmpty()
  @MaxLength(15, {message: 'Max length is 15 chars.'})
  title: string;
  @IsNotEmpty()
  description: string;
}