import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../services/post.service";
import {ActivatedRoute} from "@angular/router";
import {Langs} from "../model";

@Component({
  selector: 'app-language-detection',
  templateUrl: './language-detection.component.html',
  styleUrls: ['./language-detection.component.css']
})
export class LanguageDetectionComponent implements OnInit {


  ldGroup: FormGroup;
  langs: Langs[] = [];

  constructor(private route: ActivatedRoute, private postService: PostService, private formBuilder: FormBuilder) {
    this.ldGroup = this.formBuilder.group({
      ldInput: ['', Validators.required],
      ldCheck: [false]
    })
  }

  postLangDet(){
    this.postService.langDetection(
      this.ldGroup.get("ldInput")?.value,
      this.ldGroup.get("ldCheck")?.value
    ).subscribe(res => {
      this.langs = res.detectedLangs
    })
  }

  ngOnInit(): void {
  }

}
