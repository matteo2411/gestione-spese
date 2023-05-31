import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { CommonDataService } from 'src/app/common/common-data.service';
import { GlobalConstants } from 'src/app/globalConstants';

@Component({
  selector: 'app-lista-account',
  templateUrl: './lista-account.component.html',
  styleUrls: ['./lista-account.component.css']
})
export class ListaAccountComponent implements OnInit {

  listaAccount : any[] = [];
  listaAccountVisibili : any[] = [];
  page = 1;
  pageSize = 6;
  listaSize = 0;
  faTimes = faTimes;

  constructor(private commonService : CommonDataService) { }

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
      this.refreshData();
    },(error)=>{
      this.commonService.hideSpinner();
      this.commonService.addDangerMessage("Errore nel recupero degli account",true);
    })
  }

  cancella(id : number): void {
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

  
  refreshData() {
    this.listaSize = this.listaAccount.length;
    this.listaAccountVisibili = this.listaAccount
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}
