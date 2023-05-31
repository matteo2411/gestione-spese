import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonDataService } from 'src/app/common/common-data.service';
import { GlobalConstants } from 'src/app/globalConstants';

@Component({
  selector: 'app-crea-categoria',
  templateUrl: './crea-categoria.component.html',
  styleUrls: ['./crea-categoria.component.css']
})
export class CreaCategoriaComponent implements OnInit {

  listaCategorie : any[] = []; 
  creaCategoriaForm = new UntypedFormGroup({
    nomeCategoria: new UntypedFormControl(null, Validators.required),
    categoria: new UntypedFormControl("categoria-padre", null),
    categoriaPadre: new UntypedFormControl(null)
  })

  constructor(private commonService : CommonDataService) { }

  ngOnInit(): void {
    this.getCategorieRoot(true, false);

    this.commonService.setBreadcrumbItems([
      { 
        label: 'Spese',
        routerLink: '/spese/lista',
        queryParams: {
          "idParent" : "1",
          "indietro" : "0"
        }
      },{ 
        label: 'Categorie',
        routerLink: '/categorie/lista',
        queryParams: {
          "idParent" : "1-5",
          "indietro" : "0"
        }
      },{ 
        label: 'Crea',
        routerLink: '/categorie/crea',
        queryParams: {
          "idParent" : "1-5",
          "indietro" : "0"
        }
      }
    ]);
  }

  creaCategoria(): void {
    this.commonService.resetMessages();
    let nuovaCategoria = {};
    if(this.creaCategoriaForm.value.categoria==='sotto-categoria'){
      nuovaCategoria = {
        "nomeCategoria" : this.creaCategoriaForm.value.nomeCategoria,
        "categoriaPadre" : {
          "id" : this.creaCategoriaForm.value.categoriaPadre
        }
      };
    }else{
      nuovaCategoria = {
        "nomeCategoria" : this.creaCategoriaForm.value.nomeCategoria
      };
    }

    this.commonService.showSpinner();
    this.commonService.callApiPost(GlobalConstants.creaCategoria, nuovaCategoria).subscribe((data)=>{
      this.commonService.hideSpinner();
      if(data.success){
        this.creaCategoriaForm.reset();
        this.getCategorieRoot(false, true);
        this.commonService.addSuccessMessage("Categoria inserita correttamente",true);
      }else{
        this.commonService.addDangerMessage("Errore nell'inserimento della categoria",true);
      }
    },(error)=>{
      this.commonService.addDangerMessage("Errore nell'inserimento della categoria",true);
    })
  }

  getCategorieRoot(hideMessage : Boolean, forceReload: Boolean) : void{
    if(!this.listaCategorie || !this.listaCategorie.length || forceReload){
      if(hideMessage){
        this.commonService.resetMessages();
      }
      this.commonService.showSpinner();
      this.commonService.callApiGet(GlobalConstants.listaCategorieRoot).subscribe((data)=>{
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
  }

}
