/*
https://docs.nestjs.com/interceptors#interceptors
*/

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AddFilesToBodyInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    if (req.files) {
      this.setBodyFiles(context.switchToHttp().getRequest());
    }
    return next.handle().pipe();
  }

  setBodyFiles(req: Request) {
    if (!Array.isArray((req as any).files)) {
      (req as any).body = { ...req.body, ...((req as any).files as any) };
      // console.log((req as any).body);
    } else {
      (req as any).files = Array.isArray((req as any).files)
        ? (req as any).files
        : [(req as any).files];
      const filesAttributes = ((req as any).files as any[]).reduce(
        (group: any[], file) => {
          const { fieldname } = file;
          group[fieldname] = group[fieldname] ?? [];
          group[fieldname].push(file);
          return group;
        },
        {},
      );
      Object.keys(filesAttributes).forEach((attribute: any) => {
        if (filesAttributes[attribute].length == 1) {
          filesAttributes[attribute] = filesAttributes[attribute][0];
        }
      });
      (req as any).body = { ...req.body, ...filesAttributes };
    }
  }
}
