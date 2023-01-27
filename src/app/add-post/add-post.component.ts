import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { PostPayload } from "./post-payload";
import { AddPostService } from "../add-post.service";
import { Router } from "@angular/router";


@Component({
  selector: "app-add-post",
  templateUrl: "./add-post.component.html",
  styleUrls: ["./add-post.component.css"],
})
export class AddPostComponent implements OnInit {
  addPostForm: FormGroup;
  postPayload: PostPayload;
  title = new FormControl("");
  body = new FormControl("");
  category = new FormControl("");
  picture = new FormControl("");
  short_description = new FormControl("");

  selectedFile:File = null;

  file_base64:FileReader = new FileReader();
  


  constructor(private addpostService: AddPostService, private router: Router) {
  
    
    this.addPostForm = new FormGroup({
      title: this.title,
      body: this.body,
      short_description: this.short_description,
      category: this.category,
      picture: this.picture,
    });
    this.postPayload = {
      id: "",
      content: "",
      short_description: "",
      category: "",
      picture: "",
      title: "",
      username: "",
    };
  }

  ngOnInit() {}


  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];

    this.file_base64.readAsDataURL(this.selectedFile);
    this.file_base64.onload = () => {
        console.log(this.file_base64.result);
    };
  }


  addPost() {

    this.postPayload.content = this.addPostForm.get("body").value;
    this.postPayload.title = this.addPostForm.get("title").value;
    this.postPayload.category = this.addPostForm.get("category").value;
    this.postPayload.picture = String(this.file_base64.result);
    this.postPayload.short_description =
      this.addPostForm.get("short_description").value;
    this.addpostService.addPost(this.postPayload).subscribe(
      (data) => {
        this.router.navigateByUrl("/");
      },
      (error) => {
        console.log("Failure Response");
      }
    );
      setTimeout(()=> {
         history.back();
      }
     ,1000);
  }


  


}
