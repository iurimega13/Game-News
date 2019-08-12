import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
  CanActivateChild,
  UrlSegment
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import { Route } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkAuthState(state.url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    const url = segments.map(s => '/${s}').join('');
    return this.checkAuthState(url).pipe(take(1));
  }
  private checkAuthState(redirect: string): Observable<boolean> {
    return this.authService.isAutenticated.pipe(
      tap(is => {
        if (!is) {
          this.router.navigate(['/login'], {
            queryParams: { redirect }
          });
        }
      })
    );
  }
}
