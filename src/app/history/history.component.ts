import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HistoryService} from "../services/history.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  history: string[] = [];
  nothing: boolean = true;

  constructor(private route: ActivatedRoute, private historyService: HistoryService) { }

  ngOnInit(): void {
    this.history =  this.historyService.getHistory();
    if(this.history !== [])
      this.nothing = false;
  }


}
