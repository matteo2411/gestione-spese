import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonDataService } from 'src/app/common/common-data.service';
import { GlobalConstants } from 'src/app/globalConstants';

@Component({
  selector: 'app-investimenti-crea',
  templateUrl: './investimenti-crea.component.html',
  styleUrls: ['./investimenti-crea.component.css']
})
export class InvestimentiCreaComponent implements OnInit {

  creaInvestimentoForm = new UntypedFormGroup({
    nomeInvestimento: new UntypedFormControl(null, Validators.required),
    quotaAttuale: new UntypedFormControl(null, Validators.required)
  })

  constructor(private commonService : CommonDataService) { }

  ngOnInit(): void {
    this.commonService.setBreadcrumbItems([
      { 
        label: 'Investimenti',
        routerLink: '/investimenti/lista',
        queryParams: {
          "idParent" : "2",
          "indietro" : "0"
        }
      },{ 
        label: 'Crea',
        routerLink: '/investimenti/crea',
        queryParams: {
          "idParent" : "2",
          "indietro" : "0"
        }
      }
    ]);
  }

  creaInvestimento(){
    const values = this.creaInvestimentoForm.value;
    this.commonService.resetMessages();
    this.commonService.showSpinner();
    this.commonService.callApiPost(GlobalConstants.creaInvestimento, values).subscribe((response)=>{
      this.commonService.hideSpinner();
      if(response.success){
        this.creaInvestimentoForm.reset();
        this.commonService.addSuccessMessage("Investimento creato correttamente, ora è possibile associarlo tramite la funzione 'Associa Utente'",true);
      }else{
        this.commonService.addDangerMessage("Errore nella creazione dell'investimento",true);
      }
    },(error)=>{
      this.commonService.hideSpinner();
      this.commonService.addDangerMessage("Errore nella creazione dell'investimento",true);
    })
  }

}
