import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { CommonDataService } from '../common-data.service';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent {
    
  menuAll = [{
    "id" : "1",
    "idParent" : "0",
    "tooltip" : "Spese",
    "tipo" : "spese",
    "class" : "pi pi-wallet primary fa-2x pointer",
    "url" :  "spese/lista",
    "children" : [
      {
        "id" : "1-1",
        "idParent" : "1",
        "tooltip" : "Indietro",
        "class" : "pi pi-step-backward back-icon fa-2x pointer",
        "tipo" : "spese",
        "url" :  "indietro:/"
      },
      {
        "id" : "1-2",
        "idParent" : "1",
        "tooltip" : "Carica",
        "class" : "pi pi-cloud-upload primary fa-2x pointer",
        "tipo" : "spese",
        "url" :  "spese/carica"
      },
      {
        "id" : "1-3",
        "idParent" : "1",
        "tooltip" : "Lista",
        "class" : "pi pi-search primary fa-2x pointer",
        "tipo" : "spese",
        "url" :  "spese/lista"
      },
      {
        "id" : "1-3",
        "idParent" : "1",
        "tooltip" : "Storico",
        "class" : "pi pi-history primary fa-2x pointer",
        "tipo" : "spese",
        "url" :  "spese/storico"
      },
      {
        "id" : "1-4",
        "idParent" : "1",
        "tooltip" : "Cruscotto",
        "class" : "pi pi-chart-bar primary fa-2x pointer",
        "tipo" : "spese",
        "url" :  "spese/cruscotto",
      },
      {
        "id" : "1-5",
        "idParent" : "1",
        "tooltip" : "Categorie",
        "class" : "pi pi-flag primary fa-2x pointer",
        "tipo" : "spese",
        "url" :  "categorie/lista",
        "children": [
        {
          "id" : "1-5-1",
          "idParent" : "1-5",
          "tooltip" : "Indietro",
          "class" : "pi pi-step-backward back-icon fa-2x pointer",
          "tipo" : "spese",
          "url" :  "indietro:spese/lista"
        },{
          "id" : "1-5-2",
          "idParent" : "1-5",
          "tooltip" : "Lista",
          "class" : "pi pi-search primary fa-2x pointer",
          "tipo" : "spese",
          "url" :  "categorie/lista"
        },{
          "id" : "1-5-3",
          "idParent" : "1-5",
          "tooltip" : "Crea",
          "class" : "pi pi-plus-circle primary fa-2x pointer",
          "tipo" : "spese",
          "url" :  "categorie/crea"
        }]
      },
      {
        "id" : "1-6",
        "idParent" : "1",
        "tooltip" : "Account",
        "class" : "pi pi-credit-card primary fa-2x pointer",
        "tipo" : "spese",
        "url" :  "account/lista",
        "children": [
        {
          "id" : "1-6-1",
          "idParent" : "1-6",
          "tooltip" : "Indietro",
          "class" : "pi pi-step-backward back-icon fa-2x pointer",
          "tipo" : "spese",
          "url" :  "indietro:spese/lista"
        },{
          "id" : "1-6-2",
          "idParent" : "1-6",
          "tooltip" : "Lista",
          "class" : "pi pi-search primary fa-2x pointer",
          "tipo" : "spese",
          "url" :  "account/lista"
        },{
          "id" : "1-6-3",
          "idParent" : "1-6",
          "tooltip" : "Crea",
          "class" : "pi pi-plus-circle primary fa-2x pointer",
          "tipo" : "spese",
          "url" :  "account/crea"
        }]
      },
      {
        "id" : "1-7",
        "idParent" : "1",
        "tooltip" : "Tipologie",
        "class" : "pi pi-verified primary fa-2x pointer",
        "tipo" : "spese",
        "url" :  "tipologie/lista",
        "children": [
        {
          "id" : "1-7-1",
          "idParent" : "1-7",
          "tooltip" : "Indietro",
          "class" : "pi pi-step-backward back-icon fa-2x pointer",
          "tipo" : "spese",
          "url" :  "indietro:spese/lista"
        },{
          "id" : "1-7-2",
          "idParent" : "1-7",
          "tooltip" : "Lista",
          "class" : "pi pi-search primary fa-2x pointer",
          "tipo" : "spese",
          "url" :  "tipologie/lista"
        },{
          "id" : "1-7-3",
          "idParent" : "1-7",
          "tooltip" : "Crea",
          "class" : "pi pi-plus-circle primary fa-2x pointer",
          "tipo" : "spese",
          "url" :  "tipologie/crea"
        }]
      }
    ]
  },{
    "id" : "2",
    "idParent" : "0",
    "tooltip" : "Investimenti",
    "class" : "pi pi-chart-line primary fa-2x pointer",
    "tipo" : "investimenti",
    "url" :  "investimenti/lista",
    "children" : [
      {
        "id" : "2-1",
        "idParent" : "2",
        "tooltip" : "Indietro",
        "class" : "pi pi-step-backward back-icon fa-2x pointer",
        "tipo" : "investimenti",
        "url" :  "indietro:/"
      },
      {
        "id" : "2-2",
        "idParent" : "2",
        "tooltip" : "Crea",
        "class" : "pi pi-plus-circle primary fa-2x pointer",
        "tipo" : "investimenti",
        "url" :  "investimenti/crea"
      },
      {
        "id" : "2-3",
        "idParent" : "2",
        "tooltip" : "Lista",
        "class" : "pi pi-search primary fa-2x pointer",
        "tipo" : "investimenti",
        "url" :  "investimenti/lista"
      },
      {
        "id" : "2-4",
        "idParent" : "2",
        "tooltip" : "Associa Utente",
        "class" : "pi pi-user-plus primary fa-2x pointer",
        "tipo" : "investimenti",
        "url" :  "investimenti/associa-utente"
      },
      {
        "id" : "2-5",
        "idParent" : "2",
        "tooltip" : "Investimenti Utente",
        "class" : "pi pi-users primary fa-2x pointer",
        "tipo" : "investimenti",
        "url" :  "investimenti/lista-utente"
      }
    ]
  },{
    "id" : "3",
    "idParent" : "0",
    "tooltip" : "Sistema",
    "class" : "pi pi-cog primary fa-2x pointer",
    "tipo" : "sistema",
    "url" :  "utente/lista",
    "children": [
    {
      "id" : "3-1",
      "idParent" : "3",
      "tooltip" : "Indietro",
      "class" : "pi pi-step-backward back-icon fa-2x pointer",
      "tipo" : "sistema",
      "url" :  "indietro:/"
    },{
      "id" : "3-2",
      "idParent" : "3",
      "tooltip" : "Lista",
      "class" : "pi pi-search primary fa-2x pointer",
      "tipo" : "sistema",
      "url" :  "utente/lista"
    },{
      "id" : "3-3",
      "idParent" : "3",
      "tooltip" : "Crea",
      "class" : "pi pi-plus-circle primary fa-2x pointer",
      "tipo" : "sistema",
      "url" :  "utente/crea"
    }]
  }]
  menuToShow = this.menuAll;

  constructor(private router: Router, private commonService : CommonDataService) {
    this.router.events.subscribe((val) => {
      if(val instanceof NavigationStart){
        let queryParams = val.url.split("?")[1];
        if(!queryParams){
          this.menuToShow = this.menuAll;
        }else{
          let firstParam = queryParams.split("&")[0];
          let secondParam = queryParams.split("&")[1];
          let idParent = firstParam.split("idParent=")[1];
          let indietro = secondParam.split("indietro=")[1];
          if(indietro === "1"){
            this.cercaChildrenFromParent(idParent, this.menuAll);
          }else{
            this.cercaChildren(idParent, this.menuAll);
          }
        }
      }
    });
  }

  select(icon : any){
    this.commonService.appSelezionata = icon.tipo;
    if(icon.url && icon.url.length){
      if(icon.url.indexOf("indietro")>-1){
        this.router.navigateByUrl(icon.url.split(":")[1]+"?idParent="+icon.idParent+"&indietro=1");
      }else{
        this.router.navigateByUrl(icon.url+"?idParent="+icon.idParent+"&indietro=0");
      }
    }
    if(icon.children && icon.children.length){
      this.menuToShow = icon.children;
    }
  }

  cercaChildrenFromParent(id: String, menuList: any): any{
    menuList.map((item: any)=>{
      if(item.id === id){
        this.cercaChildren(item.idParent, this.menuAll);
      }else if(item.children && item.children.length){
        this.cercaChildrenFromParent(id, item.children);
      }
    })
  }

  cercaChildren(id: String, menuList: any): any{
    if(id === "0"){
      this.menuToShow = this.menuAll;
    }
    menuList.map((item: any)=>{
      if(item.id === id){
        this.menuToShow = item.children;
      }else{
        if(item.children && item.children.length){
          return this.cercaChildren(id, item.children);
        }
      }
    })
  }

}
