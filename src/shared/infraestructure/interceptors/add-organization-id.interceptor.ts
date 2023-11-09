import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AddOrganizationIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    const { organizationId } = context.switchToHttp().getRequest().user;
    if (organizationId) {
      (request.body as any).organizationId = organizationId;
    }
    return next.handle();
  }
}
