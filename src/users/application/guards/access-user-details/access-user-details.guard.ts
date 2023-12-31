import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AccessUserDetailsGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const { sub } = context.switchToHttp().getRequest().user;
    return context.switchToHttp().getRequest().params.userId === sub;
  }
}
