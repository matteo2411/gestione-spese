import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonDataService } from 'src/app/common/common-data.service';
import { GlobalConstants } from 'src/app/globalConstants';

@Component({
  selector: 'app-investimenti-associa-utente',
  templateUrl: './investimenti-associa-utente.component.html',
  styleUrls: ['./investimenti-associa-utente.component.css']
})
export class InvestimentiAssociaUtenteComponent implements OnInit {

  associaInvestimentoForm : UntypedFormGroup;
  listaUtenti : any[] = [];
  listaInvestimenti: any[] = [];

  constructor(private commonService : CommonDataService) {
    this.associaInvestimentoForm = new UntypedFormGroup({
      utenteForm : new UntypedFormControl(null, Validators.required),
      investimentoForm : new UntypedFormControl(null, Validators.required)
    })
  }

  ngOnInit(): void {
    this.getUtenti();
    this.getInvestimenti();
    this.commonService.setBreadcrumbItems([
      { 
        label: 'Investimenti',
        routerLink: '/investimenti/lista',
        queryParams: {
          "idParent" : "2",
          "indietro" : "0"
        }
      },{ 
        label: 'Associa Utente',
        routerLink: '/investimenti/associa-utente',
        queryParams: {
          "idParent" : "2",
          "indietro" : "0"
        }
      }
    ]);
  }

  resetCampi() {
    this.associaInvestimentoForm.reset();
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

  getInvestimenti() : void{
    this.commonService.resetMessages();
    this.commonService.showSpinner();
    this.commonService.callApiGet(GlobalConstants.listaInvestimentiValidi).subscribe((data)=>{
      this.commonService.hideSpinner();
      if(data.success){
        this.listaInvestimenti = data.oggetto;
      }else{
        this.listaInvestimenti = [];
        this.commonService.addDangerMessage("Errore nel recupero degli investimenti",true);
      }
    },(error)=>{
      this.commonService.hideSpinner();
      this.commonService.addDangerMessage("Errore nel recupero degli investimenti",true);
    })
  }

  associaInvestimento(): void{
    const formValue = this.associaInvestimentoForm.value;
    const input = {
      investimento : this.listaInvestimenti.filter((item) => item.id == formValue.investimentoForm)[0],
      nrQuote : 0,
      nomeUtente : this.listaUtenti.filter((item)=> item.id == formValue.utenteForm)[0].name,
      operazione : 'SOLO ASSOCIAZIONE'
    }
    this.commonService.resetMessages();
    this.commonService.showSpinner();
    this.commonService.callApiPost(GlobalConstants.associaInvestimentoUtente, input).subscribe((data)=>{
      this.commonService.hideSpinner();
      if(data.success){
        this.resetCampi();
        this.commonService.addSuccessMessage("Investimento correttamente aggiornato",true);
      }else{
        this.commonService.addDangerMessage("Errore nell'aggiornamento dell'investimento",true);
      }
    },(error)=>{
      this.commonService.hideSpinner();
      this.commonService.addDangerMessage("Errore nell'aggiornamento dell'investimento",true);
    })
  }

}
