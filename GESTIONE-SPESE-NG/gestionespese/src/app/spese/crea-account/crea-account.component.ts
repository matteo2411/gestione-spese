import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonDataService } from 'src/app/common/common-data.service';
import { GlobalConstants } from 'src/app/globalConstants';

@Component({
  selector: 'app-crea-account',
  templateUrl: './crea-account.component.html',
  styleUrls: ['./crea-account.component.css']
})
export class CreaAccountComponent implements OnInit {

  creaAccountForm = new UntypedFormGroup({
    nomeAccount: new UntypedFormControl(null, Validators.required)
  })

  constructor(private commonService : CommonDataService) { }

  ngOnInit(): void {
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
        label: 'Crea',
        routerLink: '/account/crea',
        queryParams: {
          "idParent" : "1-6",
          "indietro" : "0"
        }
      }
    ]);
  }

  creaAccount(): void {
    this.commonService.resetMessages();
    this.commonService.showSpinner();
    this.commonService.callApiPost(GlobalConstants.creaAccount, this.creaAccountForm.value).subscribe((data)=>{
      this.commonService.hideSpinner();
      if(data.success){
        this.creaAccountForm.reset();
        this.commonService.addSuccessMessage("Account inserito correttamente",true);
      }else{
        this.commonService.addDangerMessage("Errore nell'inserimento dell'account",true);
      }
    },(error)=>{
      this.commonService.addDangerMessage("Errore nell'inserimento dell'account",true);
    })
  }

}
