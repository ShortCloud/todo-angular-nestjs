import { Body, Post } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { RegisterUserDTO } from 'src/DTO/register-user.dto';
import { UserLoginDTO } from 'src/DTO/user-login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('register')
  registration(@Body(ValidationPipe) regDTO: RegisterUserDTO) {
   return this.authService.registerUser(regDTO);
  }

  @Post('login')
  signIn(@Body(ValidationPipe) loginDTO: UserLoginDTO) {
    return this.authService.loginUser(loginDTO);
  }

}
