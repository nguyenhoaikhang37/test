import { forwardRef, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { variblesConfig } from 'src/config'
import { UserModule } from '../user/user.module'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy.service'

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: variblesConfig.JWT_SECRET,
        signOptions: { expiresIn: '99999999999999s' }
      })
    }),
    forwardRef(() => UserModule)
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
