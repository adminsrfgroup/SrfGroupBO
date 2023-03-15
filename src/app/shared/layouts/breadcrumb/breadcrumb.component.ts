import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "./services/breadcrumb.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit{
  breadcrumbList: Array<any> = [];

  constructor(
    private _router: Router
  ) {}

  ngOnInit() {
    // this.listenRouting()
  }
  //
  // listenRouting() {
  //   let routerUrl: string, routerList: Array<any>, target: any;
  //   this._router.events.subscribe((router: any) => {
  //     routerUrl = router.urlAfterRedirects;
  //     if (routerUrl && typeof routerUrl === 'string') {
  //       // 初始化breadcrumb
  //       this.breadcrumbList.length = 0;
  //       // 取得目前routing url用/區格, [0]=第一層, [1]=第二層 ...etc
  //       routerList = routerUrl.slice(1).split('/');
  //       routerList.forEach((router, index) => {
  //         // 找到這一層在menu的路徑和目前routing相同的路徑
  //         target = target?.find((page: any) => page.path.slice(2) === router);
  //         // 存到breadcrumbList到時後直接loop這個list就是麵包屑了
  //         this.breadcrumbList.push({
  //           name: target?.name,
  //           // 第二層開始路由要加上前一層的routing, 用相對位置會造成routing錯誤
  //           path: (index === 0) ? target?.path : `${this.breadcrumbList[index-1].path}/${target?.path.slice(2)}`
  //         });
  //
  //         // 下一層要比對的目標是這一層指定的子頁面
  //         if (index+1 !== routerList.length) {
  //           target = target?.children;
  //         }
  //       });
  //
  //       console.log('this.breadcrumbList ', this.breadcrumbList);
  //     }
  //   });
  // }
}
