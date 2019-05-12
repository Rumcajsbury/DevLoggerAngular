import { Component, OnInit } from '@angular/core';
//Models
import { Log } from '../../models/Log';
//Services
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  logs: Log[];
  selectedLog: Log;
  loaded: boolean = false;

  constructor(private logService: LogService) { }

  ngOnInit() {
    this.logService.stateClear.subscribe(clear =>{
      if(clear){ 
        this.selectedLog = {id: '', text: '', date: ''};
      }
    });

    this.logService.getLogs().subscribe(logs =>{
      this.logs = logs
      this.loaded = true;
    })
  }

  onSelect(log: Log): void{
    this.logService.setFormLog(log);
    this.selectedLog = log;
  }

  onDelete(log: Log){
    if(confirm('Are you sure you want to delete?'))
    {
      this.logService.deleteLog(log);
    }
  }

}
