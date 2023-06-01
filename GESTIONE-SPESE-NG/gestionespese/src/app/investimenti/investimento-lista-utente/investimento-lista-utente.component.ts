import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faBox, faCalendar, faMinus, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { CommonDataService } from 'src/app/common/common-data.service';
import { GlobalConstants } from 'src/app/globalConstants';

@Component({
  selector: 'app-investimento-lista-utente',
  templateUrl: './investimento-lista-utente.component.html',
  styleUrls: ['./investimento-lista-utente.component.css']
})
export class InvestimentoListaUtenteComponent implements OnInit {

  storicoEventSubject: Subject<any> = new Subject<any>();
  listaInvestimentiForm : UntypedFormGroup;
  listaInvestimenti : any[] = [];
  listaUtenti : any[] = [];
  faSearch = faSearch;
  faPlus = faPlus;
  faMinus = faMinus;
  faStorico = faBox;
  faCalendar = faCalendar;

  editForm : UntypedFormGroup = new UntypedFormGroup({
    quote : new UntypedFormControl(null, Validators.required),
    data : new UntypedFormControl(null, Validators.required),
    quotazione : new UntypedFormControl(null, Validators.required)
  });
  tipo : String;
  valoreTotale = 0;
  spesa = 0;
  mostraMessaggioNoInvestimenti = false;

  constructor(private commonService : CommonDataService, private modalService : NgbModal) {
    this.listaInvestimentiForm = new UntypedFormGroup({
      utenteForm : new UntypedFormControl(null, Validators.required)
    })
  }

  ngOnInit(): void {
    this.valoreTotale = 0;
    this.getUtenti();
    this.commonService.setBreadcrumbItems([
      { 
        label: 'Investimenti',
        routerLink: '/investimenti/lista',
        queryParams: {
          "idParent" : "2",
          "indietro" : "0"
        }
      },{ 
        label: 'Investimenti Utente',
        routerLink: '/investimenti/lista-utente',
        queryParams: {
          "idParent" : "2",
          "indietro" : "0"
        }
      }
    ]);
  }

  resetCampi() {
    this.listaInvestimentiForm.reset();
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

  ricercaInvestimenti() : void{
    this.mostraMessaggioNoInvestimenti = false;
    this.valoreTotale = 0;
    this.commonService.resetMessages();
    this.commonService.showSpinner();
    this.commonService.callApiPost(GlobalConstants.listaInvestimentiValidiUtente, {
      "idUtente" : this.listaInvestimentiForm.value.utenteForm
    }).subscribe((data)=>{
      this.commonService.hideSpinner();
      if(data.success){
        this.listaInvestimenti = data.oggetto;
        this.listaInvestimenti.map((investimento)=>{
          this.valoreTotale += Number(((investimento.quoteTotali * investimento.investimento.quotaAttuale)).toFixed(2));
        })
        this.valoreTotale = Number((this.valoreTotale).toFixed(2));
        this.getAllStorici();
      }else{
        this.listaInvestimenti = [];
        this.commonService.addDangerMessage("Errore nel recupero degli investimenti a sistema dell'utente",true);
      }
      if(!this.listaInvestimenti || !this.listaInvestimenti.length){
        this.mostraMessaggioNoInvestimenti = true;
      }
    },(error)=>{
      this.commonService.hideSpinner();
      this.commonService.addDangerMessage("Errore nel recupero degli investimenti a sistema dell'utente",true);
    })
  }

  open(content : any, elementoSelezionato : any, tipoModal : any) {
    this.tipo = tipoModal;
    this.editForm.reset();

    const options = { 
      ariaLabelledBy: 'aggiorna-investimento',
      size: 'lg',
      windowClass: 'custom-modal-window', 
      backdropClass: 'custom-modal-backdrop' 
    };
    this.editForm.controls['quotazione'].setValue(elementoSelezionato.investimento.quotaAttuale);
    this.modalService.open(content, options).result.then((result : any) => {
      if(result === 'Salva'){
        this.commonService.resetMessages();
        this.commonService.showSpinner();
        this.commonService.callApiPost(GlobalConstants.associaInvestimentoUtente, {
          "investimento" : elementoSelezionato.investimento,
          "nrQuote" : this.editForm.value.quote,
          "nomeUtente" : elementoSelezionato.utente.name,
          "operazione" : this.tipo.toUpperCase(),
          "quotazione" : this.editForm.value.quotazione,
          "dataOperazione" : this.editForm.value.data
        }).subscribe((data)=>{
          this.commonService.hideSpinner();
          if(data.success){
            this.commonService.addSuccessMessage("Investimento aggiornato correttamente",true);
            this.ricercaInvestimenti();
          }else{
            this.commonService.addDangerMessage("Errore nell'aggiornamento dell'investimento",true);
          }
        },(error)=>{
          this.commonService.hideSpinner();
          this.commonService.addDangerMessage("Errore nell'aggiornamento dell'investimento",true);
        })
      }
    }, () => {
    });
  }

  openStorico(elementoSelezionato : any) {
    this.storicoEventSubject.next(elementoSelezionato);
  }

  getAllStorici(){
    this.spesa = 0;
    this.commonService.resetMessages();
    this.commonService.showSpinner();
    this.commonService.callApiPost(GlobalConstants.listaInvestimentiUtenteStorici, {
      utente : {
        "nomeUtente" : this.listaInvestimentiForm.value.utenteForm
      }
    }).subscribe((data)=>{
      this.commonService.hideSpinner();
      if(data.success){
        data.oggetto.map((item : any)=>{
          this.spesa = this.spesa + item.uscita - item.entrata;
        })
      }else{
        this.commonService.addDangerMessage("Errore nel recupero dello storico",true);
      }
    },(error)=>{
      this.commonService.hideSpinner();
      this.commonService.addDangerMessage("Errore nel recupero dello storico",true);
    })
  }
}


