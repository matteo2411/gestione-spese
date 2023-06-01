import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/globalConstants';
import { CommonDataService } from 'src/app/common/common-data.service';

@Component({
  selector: 'app-lista-tipologie',
  templateUrl: './lista-tipologie.component.html',
  styleUrls: ['./lista-tipologie.component.css']
})
export class ListaTipologieComponent implements OnInit {

  listaTipologie : any[] = [];

  constructor(private commonService : CommonDataService) { }

  ngOnInit(): void {
    this.getTipologie();
    this.commonService.setBreadcrumbItems([
      { 
        label: 'Spese',
        routerLink: '/spese/lista',
        queryParams: {
          "idParent" : "1",
          "indietro" : "0"
        }
      },{ 
        label: 'Tipologie',
        routerLink: '/tipologie/lista',
        queryParams: {
          "idParent" : "1-7",
          "indietro" : "0"
        }
      },{ 
        label: 'Lista',
        routerLink: '/tipologie/lista',
        queryParams: {
          "idParent" : "1-7",
          "indietro" : "0"
        }
      }
    ]);
  }

  getTipologie() : void{
    this.commonService.showSpinner();
    this.commonService.resetMessages();
    this.commonService.callApiGet(GlobalConstants.listaTipologie).subscribe((data)=>{
      this.commonService.hideSpinner();
      if(data.success){
        this.listaTipologie = data.oggetto;
      }else{
        this.listaTipologie = [];
        this.commonService.addDangerMessage("Errore nel recupero delle tipologie",true);
      }
    },(error)=>{
      this.commonService.hideSpinner();
      this.commonService.addDangerMessage("Errore nel recupero delle tipologie",true);
    })
  }

  cancella(id : number): void {
    this.commonService.showSpinner();
    this.commonService.resetMessages();
    this.commonService.callApiDelete(GlobalConstants.eliminaTipologia+id).subscribe((data)=>{
      this.commonService.hideSpinner();
      if(data.success){
        this.commonService.addSuccessMessage("Tipologia eliminata correttamente",true);
        this.getTipologie();
      }else{
        this.listaTipologie = [];
        this.commonService.addDangerMessage("Errore nell'eliminazione della tipologia",true);
      }
    },(error)=>{
      this.commonService.addDangerMessage("Errore nell'eliminazione della tipologia",true);
    })
  }
  
}
