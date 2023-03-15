import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SideBarComponent {
  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

  listAccordions = [
    {
      id: 0,
      name: 'Dashboard Mangment',
      children: [
        {
          id: 0,
          name: 'Dashboard',
          link: '/private/dashboard/home'
        },
        {
          id: 1,
          name: 'Logs',
          link: '/private/dashboard/logs'
        },
        {
          id: 2,
          name: 'Organigramme',
          link: '/private/dashboard/organigramme'
        }
      ]
    },
    {
      id: 1,
      name: 'User Managment',
      children: [
        {
          id: 0,
          name: 'List Users',
          link: '/private/user/list'
        }
      ]
    },
    {
      id: 1,
      name: 'Home Managment',
      children: [
        {
          id: 0,
          name: 'List Features',
          link: '/private/home/list-feature-slide'
        }
      ]
    }
  ]
  expandedIndex = 0;
}
