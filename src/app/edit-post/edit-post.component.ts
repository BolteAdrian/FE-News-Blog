import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AddPostService } from "../add-post.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import {PostPayload} from './post-payload';

@Component({
  selector: "app-edit-post",
  templateUrl: "./edit-post.component.html",
  styleUrls: ["./edit-post.component.css"],
})
export class EditPostComponent implements OnInit {
  postPayload: PostPayload;
  data: any;
  permaLink: Number;
  form = this.fb.group({
    name: [""],
    title: [""],
    content: [""],
    short_description:[""],
    category: [""],
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private addpostService: AddPostService,
    private router2: Router,
    private router: ActivatedRoute
  ) {
    this.postPayload = {
      id: '',
      content: '',
      short_description: '',
      category: '',
      title: '',
      username: ''
    }
  }

  getData(id: string) {
    this.http.get(`http://localhost:8080/api/posts/get/${id}`).subscribe((data) => {
      this.data = {
        id: data['id'],
        content: data['content'],
        short_description: data['short_description'],
        category: data['category'],
        title: data['title'],
        username: data['username'],
      };
      this.form.patchValue(this.data);
    });
  }

  ngOnInit() {
    this.router.params.subscribe((params) => {
      this.getData(params["id"]);
      this.permaLink = params['id'];
    });
  }

  editPost() {
    this.postPayload.content = this.form.value['content'];
    this.postPayload.title = this.form.value['title'];
    this.postPayload.category = this.form.value['category'];
    this.postPayload.short_description = this.form.value['short_description'];
    this.addpostService.editPost(this.permaLink,this.postPayload).subscribe(data => {
      console.log('SUCCES');
    }, error => {
      console.log('Failure Response');
    })
     setTimeout(()=> {
      history.back();
   }
   ,1000);
  }
}
