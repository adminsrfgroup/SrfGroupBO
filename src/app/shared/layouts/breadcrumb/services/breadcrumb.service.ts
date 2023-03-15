import { Injectable } from '@angular/core';
import {distinctUntilChanged, filter, map, Observable} from "rxjs";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

export interface BreadcrumbItem {
  label: string;
  path?: string;
}
@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  public items$: Observable<BreadcrumbItem[]>;
  constructor(
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.items$ = this._router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged(),
      map(_ => this._buildBreadCrumb(this._route.root))
    );
  }

  private _buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: BreadcrumbItem[] = []): BreadcrumbItem[] {
    const newBreadcrumbs = [...breadcrumbs];

    console.log('route.routeConfig.data ', route!.data)
    /*
    if (route.routeConfig && route.routeConfig.data && route.routeConfig.data['breadcrumb']) {
      let data = '';

      if (route.routeConfig.data.breadcrumb[0] === '@') {
        route.routeConfig.data.breadcrumb.split('.').forEach((level: string, index: number) => {
          if (index === 0) {
            data = route.snapshot.data[level.substr(1)];
          } else {
            data = !!data ? (data as any)[level] : null;
          }
        });
      } else {
        data = route.routeConfig.data.breadcrumb;
      }

      newBreadcrumbs.push({
        label: data,
        path: nextUrl
      });
    }

    if (route.firstChild) {
      return this._buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    */

    return newBreadcrumbs;
  }
}
