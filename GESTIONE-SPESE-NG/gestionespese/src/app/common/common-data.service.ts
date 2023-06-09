import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {

  successMessages : string[] = [];
  dangerMessages : string[] = [];
  appSelezionata : string = 'none';
  items: MenuItem[];

  constructor(private http: HttpClient) { }

  callApiGet(url : string) : Observable<any>{
    return this.http.get<any>(url);
  }
  callApiPost(url : string, data: any) : Observable<any>{
    return this.http.post<any>(url, data);
  }
  callApiPut(url : string, data: any) : Observable<any>{
    return this.http.put<any>(url, data);
  }
  callApiDelete(url : string) : Observable<any>{
    return this.http.delete<any>(url);
  }

  addSuccessMessage(message : string, reset : Boolean){
    window.scroll(0,0);
    if(reset){
      this.resetMessages();
    }
    this.successMessages.push(message);
  }
  addDangerMessage(message : string, reset : Boolean){
    window.scroll(0,0);
    if(reset){
      this.resetMessages();
    }
    this.dangerMessages.push(message);
  }
  resetMessages(){
    this.successMessages = [];
    this.dangerMessages = [];
  }

  private subject = new Subject<any>();
  showSpinner() {
    this.subject.next();
  }
  checkShowSpinner(): Observable<any>{ 
    return this.subject.asObservable();
  }

  private subjectHide = new Subject<any>();
  hideSpinner() {
    this.subjectHide.next();
  }
  checkHideSpinner(): Observable<any>{ 
    return this.subjectHide.asObservable();
  }

  setBreadcrumbItems(items: any): void{
    this.items = items;
  }

  convertStringToData(dateString: any){
    var dateParts = dateString.split("-");
    return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
  }

  getPropByString(obj: any, propString: String) {
    if (!propString)
      return obj;
  
    var prop, props = propString.split('.');
  
    for (var i = 0, iLen = props.length - 1; i < iLen; i++) {
      prop = props[i];
  
      var candidate = obj[prop];
      if (candidate !== undefined) {
        obj = candidate;
      } else {
        break;
      }
    }
    return obj[props[i]];
  }

}
