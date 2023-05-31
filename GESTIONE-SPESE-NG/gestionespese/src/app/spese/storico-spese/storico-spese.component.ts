import { Component, OnInit } from '@angular/core';
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
  listaStoricoVisibile : any[] = [];

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
        this.refreshData();
      }else{
        this.listaStorico = [];
        this.listaSize = 0;
        this.commonService.addDangerMessage("Errore nel recupero dello storico",true);
        this.refreshData();
      }
    },(error)=>{
      this.commonService.hideSpinner();
      this.commonService.addDangerMessage("Errore nel recupero dello storico",true);
    })
  }

  
  refreshData() {
    this.listaStoricoVisibile = this.listaStorico
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

}
