import { Component, OnInit } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { CommonDataService } from 'src/app/common/common-data.service';
import { GlobalConstants } from 'src/app/globalConstants';

@Component({
  selector: 'app-storico-spese',
  templateUrl: './storico-spese.component.html',
  styleUrls: ['./storico-spese.component.css']
})
export class StoricoSpeseComponent implements OnInit {
  
  page = 1;
  pageSize = 6;
  listaSize = 0;
  listaStorico : any[] = [];

  constructor(private commonService : CommonDataService){ }

  ngOnInit(): void {
    this.ricerca();

    this.commonService.setBreadcrumbItems([
      { 
        label: 'Spese',
        routerLink: '/spese/lista',
        queryParams: {
          "idParent" : "1",
          "indietro" : "0"
        }
      },{ 
        label: 'Storico',
        routerLink: '/spese/storico',
        queryParams: {
          "idParent" : "1",
          "indietro" : "0"
        }
      }
    ]);
  }

  ricerca() : void{
    this.commonService.resetMessages();
    const input = {
      categoria : 'SPESA'
    }
    this.commonService.callApiPost(GlobalConstants.listaStorico, input).subscribe((data)=>{
      if(data.success){
        this.listaStorico = data.oggetto;
        this.listaSize = this.listaStorico.length;
      }else{
        this.listaStorico = [];
        this.listaSize = 0;
        this.commonService.addDangerMessage("Errore nel recupero dello storico",true);
      }
    },(error)=>{
      this.commonService.hideSpinner();
      this.commonService.addDangerMessage("Errore nel recupero dello storico",true);
    })
  }

  customSort(event: SortEvent) {
    if(event.data){
      event.data.sort((data1, data2) => {
        if(event.field && event.order){
          let value1 = this.commonService.getPropByString(data1, event.field);
          let value2 = this.commonService.getPropByString(data2, event.field);
          let result = null;

          if (value1 == null && value2 != null) result = -1;
          else if (value1 != null && value2 == null) result = 1;
          else if (value1 == null && value2 == null) result = 0;
          else if (event.field!='dataOperazione') result = value1.localeCompare(value2);
          else{
            result = this.commonService.convertStringToData(value1) < this.commonService.convertStringToData(value2) ? -1 :
                     this.commonService.convertStringToData(value1) > this.commonService.convertStringToData(value2) ? 1 : 0
          }

          return event.order * result;
        }else{
          return 0;
        }
    });
    }
  }

}
