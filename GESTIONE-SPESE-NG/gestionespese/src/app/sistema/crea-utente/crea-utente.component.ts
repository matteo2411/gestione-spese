import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonDataService } from 'src/app/common/common-data.service';
import { GlobalConstants } from 'src/app/globalConstants';

@Component({
  selector: 'app-crea-utente',
  templateUrl: './crea-utente.component.html',
  styleUrls: ['./crea-utente.component.css']
})
export class CreaUtenteComponent implements OnInit {
  utenteForm = new UntypedFormGroup({
    name: new UntypedFormControl(null, Validators.required),
    email: new UntypedFormControl(null, [Validators.required, Validators.email]),
  })

  constructor(private commonService : CommonDataService) { }

  ngOnInit(): void {

    this.commonService.setBreadcrumbItems([
      { 
        label: 'Sistema',
        routerLink: '/utente/lista',
        queryParams: {
          "idParent" : "3",
          "indietro" : "0"
        }
      },{ 
        label: 'Crea Utente',
        routerLink: '/utente/crea',
        queryParams: {
          "idParent" : "3",
          "indietro" : "0"
        }
      }
    ]);
  }

  creaUtente(): void {
    this.commonService.resetMessages();
    this.commonService.showSpinner();
    this.commonService.callApiPost(GlobalConstants.creaUtente, this.utenteForm.value).subscribe((data)=>{
      this.commonService.hideSpinner();
      if(data.success){
        this.utenteForm.reset();
        this.commonService.addSuccessMessage("Utente inserito correttamente",true);
      }else{
        this.commonService.addDangerMessage("Errore nell'inserimento dell'utente",true);
      }
    },(error)=>{
      this.commonService.hideSpinner();
      this.commonService.addDangerMessage("Errore nell'inserimento dell'utente",true);
    })
  }
}
