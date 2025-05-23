import { ActivatedRouteSnapshot, BaseRouteReuseStrategy } from '@angular/router';

export class CustomReuseStrategy extends BaseRouteReuseStrategy {
  public override shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.data['reuseComponent'];
  }
}
