import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { CommonDataService } from 'src/app/common/common-data.service';
import { GlobalConstants } from 'src/app/globalConstants';

@Component({
  selector: 'app-lista-utenti',
  templateUrl: './lista-utenti.component.html',
  styleUrls: ['./lista-utenti.component.css']
})
export class ListaUtentiComponent implements OnInit {

  listaUtenti : any[] = [];
  faTimes = faTimes;

  constructor(private commonService : CommonDataService) { }

  ngOnInit(): void {
    this.getUtenti();

    this.commonService.setBreadcrumbItems([
      { 
        label: 'Sistema',
        routerLink: '/utente/lista',
        queryParams: {
          "idParent" : "3",
          "indietro" : "0"
        }
      },{ 
        label: 'Lista Utenti',
        routerLink: '/utente/lista',
        queryParams: {
          "idParent" : "3",
          "indietro" : "0"
        }
      }
    ]);
  }

  getUtenti() : void{
    this.commonService.resetMessages();
    this.commonService.showSpinner();
    this.commonService.callApiGet(GlobalConstants.listaUtenti).subscribe((data)=>{
      this.commonService.hideSpinner();
      if(data.success){
        this.listaUtenti = data.oggetto;
      }else{
        this.listaUtenti = [];
        this.commonService.addDangerMessage("Errore nel recupero degli utenti",true);
      }
    },(error)=>{
      this.commonService.hideSpinner();
      this.commonService.addDangerMessage("Errore nel recupero degli utenti",true);
    })
  }

  cancella(id : number): void {
    this.commonService.resetMessages();
    this.commonService.callApiDelete(GlobalConstants.eliminaUtente+id).subscribe((data)=>{
      if(data.success){
        this.commonService.addSuccessMessage("Utente eliminato correttamente",true);
        this.getUtenti();
      }else{
        this.listaUtenti = [];
        this.commonService.addDangerMessage("Errore nell'eliminazione dell'utente",true);
      }
    },(error)=>{
      this.commonService.addDangerMessage("Errore nell'eliminazione della categoria",true);
    })
  }
}
