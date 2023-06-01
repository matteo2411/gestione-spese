import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonDataService } from '../common-data.service';

@Component({
  selector: 'app-spinner-gestione-spese',
  templateUrl: './spinner-gestione-spese.component.html',
  styleUrls: ['./spinner-gestione-spese.component.css']
})
export class SpinnerGestioneSpeseComponent {

  @ViewChild('content') content : any;

  constructor(private modalService: NgbModal, private commonService : CommonDataService) {

    this.commonService.checkShowSpinner().subscribe(() => {
      this.openSpinner();
    });
    this.commonService.checkHideSpinner().subscribe(() => {
      this.closeSpinner();
    });
  }

  openSpinner() {
    this.modalService.open(this.content, {
      backdrop: 'static',
      centered: true,
      windowClass: 'modalClass',
      keyboard: false
    });
  }

  closeSpinner() {
    this.modalService.dismissAll();
  }


}
