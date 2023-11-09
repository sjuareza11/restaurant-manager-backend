/*
https://docs.nestjs.com/guards#guards
*/

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthStoreMemberGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const { storeId } = context.switchToHttp().getRequest().user;
    return context.switchToHttp().getRequest().params.storeId === storeId;
  }
}
