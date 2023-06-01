import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { CommonDataService } from 'src/app/common/common-data.service';
import { GlobalConstants } from 'src/app/globalConstants';

@Component({
  selector: 'app-cruscotto-spese',
  templateUrl: './cruscotto-spese.component.html',
  styleUrls: ['./cruscotto-spese.component.css']
})
export class CruscottoSpeseComponent implements OnInit {

  listaUtenti : any[] = []; 
  listaAnni : any[] = []; 
  listaSpese : any[] = []; 
  listaSpeseForm = new UntypedFormGroup({
    utenteForm: new UntypedFormControl(""),
    annoForm: new UntypedFormControl(new Date().getFullYear(), Validators.required)
  })

  faSearch = faSearch;

  constructor(private commonService : CommonDataService) { }

  ngOnInit(): void {
    this.getUtenti();
    const currentYear = new Date().getFullYear();
    for(let i = 0; i<6; i++){
      this.listaAnni.push(currentYear-i);
    }

    this.commonService.setBreadcrumbItems([
      { 
        label: 'Spese',
        routerLink: '/spese/lista',
        queryParams: {
          "idParent" : "1",
          "indietro" : "0"
        }
      },{ 
        label: 'Cruscotto',
        routerLink: '/spese/cruscotto',
        queryParams: {
          "idParent" : "1",
          "indietro" : "0"
        }
      }
    ]);
  }

  getUtenti() : void{
    this.commonService.showSpinner();
    this.commonService.resetMessages();
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

  ricerca() {
    this.commonService.showSpinner();
    this.commonService.resetMessages();
    const values = this.listaSpeseForm.value;
    const input = {
      utente : this.listaUtenti.filter((item)=> item.id == this.listaSpeseForm.value.utenteForm)[0],
      anno : this.listaSpeseForm.value.annoForm
    }
    this.commonService.callApiPost(GlobalConstants.riepilogoSpese, input).subscribe((data)=>{
      this.commonService.hideSpinner();
      if(data.success){
        this.listaSpese = data.oggetto;
        if(!this.listaSpese || !this.listaSpese.length){
          this.commonService.addDangerMessage("Nessuna spesa trovata con i criteri scelti",true);
        }
      }else{
        this.listaSpese = [];
        this.commonService.addDangerMessage("Errore nel recupero delle spese",true);
      }
    },(error)=>{
      this.commonService.hideSpinner();
      this.commonService.addDangerMessage("Errore nel recupero delle spese",true);
    })
  }

  resetCampi(){
    this.listaSpeseForm.patchValue({
      utenteForm: ""
    })
  }

}
