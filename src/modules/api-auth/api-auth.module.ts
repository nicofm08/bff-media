import { Module } from '@nestjs/common';
import { AuthService } from './services/api-auth.service';
import { ConfigModule } from 'src/config/config.module';
import { ApiAuthController } from './controllers/api-auth.controller';

@Module({
  imports: [ConfigModule],
  controllers: [ApiAuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class ApiAuthModule {}
