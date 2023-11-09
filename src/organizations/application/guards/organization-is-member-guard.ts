import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class OrganizationIsMemberGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const { organizationId } = context.switchToHttp().getRequest().user;
    return context.switchToHttp().getRequest().params.id === organizationId;
  }
}
