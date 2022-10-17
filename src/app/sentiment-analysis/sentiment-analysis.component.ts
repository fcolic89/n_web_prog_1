import { Component, OnInit } from '@angular/core';
import {Sentiment} from "../model";
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../services/post.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {toNumbers} from "@angular/compiler-cli/src/version_helpers";

@Component({
  selector: 'app-sentiment-analysis',
  templateUrl: './sentiment-analysis.component.html',
  styleUrls: ['./sentiment-analysis.component.css']
})
export class SentimentAnalysisComponent implements OnInit {

  sentiment: Sentiment = {type: '', score:''};
  isHidden: boolean = true;
  saGroup: FormGroup;

  constructor(private route: ActivatedRoute, private postService: PostService, private formBuilder: FormBuilder) {
    this.saGroup = this.formBuilder.group({
      saInput: ['', Validators.required],
      saSelect: ['auto']
    })
  }

  ngOnInit(): void {
  }

  getSenAnl(){
    this.postService.sentimentAnalysis(
      this.saGroup.get("saInput")?.value,
      this.saGroup.get("saSelect")?.value
    ).subscribe(res => {
      this.isHidden = false;
      this.sentiment = res.sentiment;
      this.changeColor(res.sentiment.score);
    })
  }

  changeColor(sc: string){
    let score = parseFloat(sc);

    const ele =  document.getElementById('saScore');
    if(ele !== null){

      let tmp = 125*score;
      let red = 125-tmp;
      let green = 125+tmp;

      let color = "#" + this.componentToHex(red) + this.componentToHex(green) + this.componentToHex(0);
      console.log(color);
      ele.style.setProperty('color', color);
    }
  }

  componentToHex(c:number):string {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
}
