import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const headers: HttpHeaders = new HttpHeaders();
    headers.append('x-api-key', environment.API_KEY)

    return next.handle(
      request.clone({
        headers: headers,
        url: `${environment.SERVER_URL}${request.url}`
      }))
  }
}
