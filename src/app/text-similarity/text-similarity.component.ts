import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../services/post.service";

@Component({
  selector: 'app-text-similarity',
  templateUrl: './text-similarity.component.html',
  styleUrls: ['./text-similarity.component.css']
})
export class TextSimilarityComponent implements OnInit {

  tsGroup: FormGroup;
  similarity: string = '';

  constructor(private route: ActivatedRoute, private postService: PostService, private formBuilder: FormBuilder) {
    this.tsGroup = this.formBuilder.group({
      tsInput1: ['', Validators.required],
      tsInput2: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }


  getTextSim(){
    this.postService.textSimilarity(this.tsGroup.get('tsInput1')?.value, this.tsGroup.get('tsInput2')?.value).subscribe(res =>{
      this.similarity = res.similarity;
    })
  }

}
