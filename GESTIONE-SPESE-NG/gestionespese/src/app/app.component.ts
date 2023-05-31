import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonDataService } from './common/common-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestionespese';  
  time: any;

  constructor(private router: Router, private commonService : CommonDataService) {
    this.router.events.subscribe((val) => {
      this.commonService.resetMessages();
    });
    this.getCurrentDate();
  }

  goToHome(){
    this.router.navigateByUrl('/');
  }

  getCurrentDate() {
    setInterval(() => {
      this.time = new Date(); 
    }, 1000); 
  }

}
