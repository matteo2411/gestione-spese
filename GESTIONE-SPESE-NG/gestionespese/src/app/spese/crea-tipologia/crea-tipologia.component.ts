import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonDataService } from 'src/app/common/common-data.service';
import { GlobalConstants } from 'src/app/globalConstants';

@Component({
  selector: 'app-crea-tipologia',
  templateUrl: './crea-tipologia.component.html',
  styleUrls: ['./crea-tipologia.component.css']
})
export class CreaTipologiaComponent implements OnInit {

  listaCategorie : any[] = []; 
  creaTipologiaForm = new UntypedFormGroup({
    nomeTipologia: new UntypedFormControl(null, Validators.required),
    categoria: new UntypedFormControl(null, Validators.required)
  })
  constructor(public commonService : CommonDataService) { }

  ngOnInit(): void {
    this.getCategorie();
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
        label: 'Crea',
        routerLink: '/tipologie/crea',
        queryParams: {
          "idParent" : "1-7",
          "indietro" : "0"
        }
      }
    ]);
  }

  getCategorie() : void{
    this.commonService.showSpinner();
    this.commonService.resetMessages();
    this.commonService.callApiGet(GlobalConstants.listaCategorie).subscribe((data)=>{
      this.commonService.hideSpinner();
      if(data.success){
        this.listaCategorie = data.oggetto;
      }else{
        this.listaCategorie = [];
        this.commonService.addDangerMessage("Errore nel recupero delle categorie",true);
      }
    },(error)=>{
      this.commonService.hideSpinner();
      this.commonService.addDangerMessage("Errore nel recupero delle categorie",true);
    })
  }

  creaTipologia() : void{
    this.commonService.showSpinner();
    const values = this.creaTipologiaForm.value;
    const data = {
      nomeTipologia : values.nomeTipologia,
      categoria : this.listaCategorie.filter((item)=>item.id == values.categoria)[0]
    }
    this.commonService.resetMessages();
    this.commonService.callApiPost(GlobalConstants.creaTipologia, data).subscribe((response)=>{
      this.commonService.hideSpinner();
      if(response.success){
        this.creaTipologiaForm.reset();
        this.commonService.addSuccessMessage("Tipologia inserita correttamente",true);
      }else{
        this.commonService.addDangerMessage("Errore nell'inserimento della tipologia",true);
      }
    },(error)=>{
      this.commonService.addDangerMessage("Errore nell'inserimento della tipologia",true);
    })
  }

}
