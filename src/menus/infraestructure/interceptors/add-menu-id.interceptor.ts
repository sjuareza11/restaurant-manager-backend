import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AddMenuIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    const { menuId } = context.switchToHttp().getRequest().params;
    if (menuId) {
      (request.body as any).menuId = menuId;
    }
    return next.handle();
  }
}
