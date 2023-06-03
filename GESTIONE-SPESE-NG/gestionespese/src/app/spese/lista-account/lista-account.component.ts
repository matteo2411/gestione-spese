import { Component, OnInit } from '@angular/core';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';
import { CommonDataService } from 'src/app/common/common-data.service';
import { GlobalConstants } from 'src/app/globalConstants';

@Component({
  selector: 'app-lista-account',
  templateUrl: './lista-account.component.html',
  styleUrls: ['./lista-account.component.css']
})
export class ListaAccountComponent implements OnInit {

  listaAccount : any[] = [];

  constructor(private commonService : CommonDataService, private confirmationService : ConfirmationService) { }

  ngOnInit(): void {
    this.getAccounts();
    this.commonService.setBreadcrumbItems([
      { 
        label: 'Spese',
        routerLink: '/spese/lista',
        queryParams: {
          "idParent" : "1",
          "indietro" : "0"
        }
      },{ 
        label: 'Account',
        routerLink: '/account/lista',
        queryParams: {
          "idParent" : "1-6",
          "indietro" : "0"
        }
      },{ 
        label: 'Lista',
        routerLink: '/account/lista',
        queryParams: {
          "idParent" : "1-6",
          "indietro" : "0"
        }
      }
    ]);
  }

  getAccounts() : void{
    this.commonService.showSpinner();
    this.commonService.resetMessages();
    this.commonService.callApiGet(GlobalConstants.listaAccount).subscribe((data)=>{
      this.commonService.hideSpinner();
      if(data.success){
        this.listaAccount = data.oggetto;
      }else{
        this.listaAccount = [];
        this.commonService.addDangerMessage("Errore nel recupero degli account",true);
      }
    },(error)=>{
      this.commonService.hideSpinner();
      this.commonService.addDangerMessage("Errore nel recupero degli account",true);
    })
  }

  cancella(account : any): void {
    this.confirmationService.confirm({
      message: 'Stai eliminando definitivamente l\'account '+account.nomeAccount+', sicuro di voler procedere? L\'operazione è irreversibile',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.eseguiCancella(account.id);
      },
      reject: (type: Number) => {
          switch (type) {
              case ConfirmEventType.REJECT:
                  break;
          }
      }
    });
  }

  eseguiCancella(id : number): void {
    this.commonService.showSpinner();
    this.commonService.resetMessages();
    this.commonService.callApiDelete(GlobalConstants.eliminaAccount+id).subscribe((data)=>{
      this.commonService.hideSpinner();
      if(data.success){
        this.commonService.addSuccessMessage("Account eliminato correttamente",true);
        this.getAccounts();
      }else{
        this.listaAccount = [];
        this.commonService.addDangerMessage("Errore nell'eliminazione dell'account",true);
      }
    },(error)=>{
      this.commonService.addDangerMessage("Errore nell'eliminazione dell'account",true);
    })
  }
  
}
