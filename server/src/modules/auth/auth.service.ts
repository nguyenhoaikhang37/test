import { Inject, Injectable, forwardRef } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { User } from '../user/schemas/user.schema'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private jwtTokenService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await (await this.userService.findOneByEmail(email)).toObject()
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        delete user.password
        return user
      }
    }
    return null
  }

  async generateUserCredentials(user: User) {
    const payload = {
      email: user.email,
      userName: user.userName,
      sub: user._id
    }

    return this.jwtTokenService.sign(payload)
  }
}
