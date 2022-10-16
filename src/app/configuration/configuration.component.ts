import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  token: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  saveToken(): void{
    if(this.token.length == 0)
      localStorage.removeItem("token")
    localStorage.setItem("token", this.token);
  }

}
