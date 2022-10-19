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
    console.log('token: 02fe667ebca6466ab10558b9674c0ece');
  }

  saveToken(): void{
    if(this.token.length == 0)
      localStorage.removeItem("token")
    localStorage.setItem("token", this.token);
  }

}
