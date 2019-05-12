import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { Log } from '../models/Log';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  logs: Log[];

  private logSource = new BehaviorSubject<Log>({id: null, text: null, date: null});
  selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor() {
    // this.logs = [
    //   {id: '1', text: 'Generated components', date: new Date('12/26/2019 12:54:23')},
    //   {id: '2', text: 'Added Bootstrap', date: new Date('12/27/2019 09:54:23')},
    //   {id: '3', text: 'Added logs component', date: new Date('12/29/2019 08:54:23')},
    // ]

      this.logs = [];
   }

   getLogs(): Observable<Log[]>{
     if(localStorage.getItem('logs') === null){
       this.logs = [];
     }else{
      this.logs = JSON.parse(localStorage.getItem('logs'));
     }

     return of(this.logs.sort((a,b) => { 
      return b.date = a.date;
     }));
   }

   setFormLog(log: Log): void {
     this.logSource.next(log);
   }

   addLog(newLog: Log){
     this.logs.unshift(newLog);

     //Add to localStorage
     this.rewriteLocalStorage();
   }

   updatelog(updLog: Log){
     this.logs.forEach((curr, index) => {
       if(updLog.id == curr.id){
         this.logs.splice(index,1);
       }
     });
     this.logs.unshift(updLog);

     //Update localStorage
     this.rewriteLocalStorage();
   }

   deleteLog(log: Log){
     this.logs.forEach((curr, index) => {
       if(curr.id == log.id){
         this.logs.splice(index, 1);
       }
     });

     this.rewriteLocalStorage();
   }

   clearState(){
    this.stateSource.next(true);
   }

   rewriteLocalStorage(): void{
    localStorage.setItem('logs', JSON.stringify(this.logs));
   }
}
