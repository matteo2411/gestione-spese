import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { CommonDataService } from '../common-data.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent {
  home: MenuItem;

  constructor(private router: Router, public commonService : CommonDataService) {
    this.router.events.subscribe((val) => {
      if(val instanceof NavigationStart){
        if(val.url === "/"){
          commonService.setBreadcrumbItems([]);
        }
      }
    });
  }

  ngOnInit() {
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }
}
