import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();

    const user = request.user; // diambil dari JWT auth guard
    const userId = user ? user.id : null;

    // if (request.method === 'POST') {
    //   request.body.created_by = userId;
    // }

    // if (request.method === 'PATCH' || request.method === 'PUT') {
    //   request.body.updated_by = userId;
    // }

    if (!request.body) {
      request.body = {};
    }

    if (request.method === 'POST') {
      request.body.created_by = userId;
    }

    if (['PATCH', 'PUT'].includes(request.method)) {
      request.body.updated_by = userId;
    }

    return next.handle().pipe(
      tap(() => {
        // bisa tambah logging jika ingin
      }),
    );
  }
}
