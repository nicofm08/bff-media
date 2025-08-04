import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import {AuthService} from '../../modules/api-auth/services/api-auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  #logger = new Logger(AuthGuard.name);
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const token = req.headers['authorization'];

    if (!token) throw new UnauthorizedException('No token provided');

    try {
      
      const response = await this.authService.validateToken(token);

      req['user'] = response; // Save user data in request object
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
