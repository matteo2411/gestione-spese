import { Component, OnInit } from '@angular/core';
import { CommonDataService } from '../common-data.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(public service : CommonDataService) { }

  ngOnInit(): void {
  }

}
