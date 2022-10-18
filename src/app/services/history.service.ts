import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class HistoryService{

  private history: string[] = [];

  addEntry(fun: string, newEntry: {[key: string]: string}){
    let date = new Date();
    let entry = '['+date.getDay()+'.'+date.getMonth()+'.'+date.getFullYear()+'. '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()+']';
    entry += ' GET ' + environment.url+fun+'?';

    for(const name in newEntry){
      entry += name + '=' + newEntry[name] + '&';
    }

    this.history.push(entry.slice(0,-1));
  }

  getHistory(): string[]{
    return this.history;
  }

}
