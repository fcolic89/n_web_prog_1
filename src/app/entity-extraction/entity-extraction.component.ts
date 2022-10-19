import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../services/post.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Annotation} from "../model";

@Component({
  selector: 'app-entity-extraction',
  templateUrl: './entity-extraction.component.html',
  styleUrls: ['./entity-extraction.component.css']
})
export class EntityExtractionComponent implements OnInit {

  eeGroup: FormGroup;
  entities: Annotation[] = [];
  isHidden: boolean = true;

  constructor(private route: ActivatedRoute, private postService: PostService, private formBuilder: FormBuilder) {
    this.eeGroup = this.formBuilder.group({
      eeInput: ['', Validators.required],
      cbImage: [false],
      cbAbstract: [false],
      cbCategories: [false],
      minConfidence: ['50']
    });
  }

  ngOnInit(): void {
  }

  getEnEx(){
    this.postService.entityExtraction(
      this.eeGroup.get('eeInput')?.value,
      this.eeGroup.get('cbImage')?.value,
      this.eeGroup.get('cbAbstract')?.value,
      this.eeGroup.get('cbCategories')?.value,
      this.eeGroup.get('minConfidence')?.value
    ).subscribe(res => {
      this.entities = res.annotations;
      this.isHidden = false;
    })
  }
}
