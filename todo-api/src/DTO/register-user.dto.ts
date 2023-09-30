import { IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";

export class RegisterUserDTO {
  
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(6) @MaxLength(12)
  //TODO: @Matches decorator with password-regex.
  password: string;
}