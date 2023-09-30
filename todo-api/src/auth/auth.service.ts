import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDTO } from 'src/DTO/register-user.dto';
import { UserEntity } from 'src/Entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserLoginDTO } from 'src/DTO/user-login.dto';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
    private jwt: JwtService
  ) {

  }

  async registerUser(registerDTO: RegisterUserDTO) {
    const {username, password} = registerDTO;
    const hashed = await bcrypt.hash(password, 12);
    const salt = await bcrypt.getSalt(hashed);

    const user = new UserEntity();
    user.username = username;
    user.password = hashed;
    user.salt = salt;

    this.repo.create(user);
    //TODO: try-catch block.
    return await this.repo.save(user);
  }

  //here why we need the passport-jwt libs.
  async loginUser(userLoginDTO: UserLoginDTO) {

    const {username, password} = userLoginDTO;

    const user = await this.repo.findOne(
      {
        where: {
          username
        } 
      }
    ) //not sure that this will work.

    if(!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if(isPasswordMatch) {
      const jwtPayload = {username};
      const jwtToken = await this.jwt.signAsync(
        jwtPayload, 
      {
        expiresIn: '1d',
        algorithm: 'HS512',
      }
    )
    return {token: jwtToken};
    } else {
      throw new UnauthorizedException('Invalid credentials.');
    }
  }


}
