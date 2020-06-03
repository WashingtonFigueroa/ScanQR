import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, filter, map, tap} from 'rxjs/operators';

export class Interceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.search('/login') === -1 && req.url.search('/user/upload') === -1 && req.url.search('/empresa/upload') === -1 && req.url.search('/noticia/upload') === -1) {
      if (localStorage.getItem('token') !== null) {
        const token = localStorage.getItem('token');
        const tokenLog = localStorage.getItem('tokenLog');
        const customReq = req.clone({
          headers: new HttpHeaders()
            .append('Authorization', token)
            .append('tokenLog', tokenLog)
        });
        return next.handle(customReq).pipe(
          map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              /*              console.log('interceptor success');
                            console.log('event--->>>', event);*/
            }
            return event;
          }),
          catchError((error: HttpErrorResponse) => {
            /*            console.log('interceptor error');
                        console.log(error);*/
            if (error.status === 401) {
              localStorage.removeItem('identity');
              localStorage.removeItem('token');
              localStorage.removeItem('tokenLog');
            }
            return throwError(error);
          })
        );
      } else {
        return next.handle(req)
      }
    } else {
      return next.handle(req);
    }
  }
}
