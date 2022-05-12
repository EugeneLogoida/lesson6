import { Component, OnInit } from '@angular/core';
import { IBlogs } from '../shared/interfaces/blogs.interface';
import { BlogsAndUsersService } from '../shared/services/blogs-and-users.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  public blogs!: IBlogs[];
  public canChange:boolean = true;
  public editStatus:boolean = false;

  public editTitle!: string;
  public editText!: string;
  public editID!: number;
  public postAuthor!: string;
  public ch!: boolean;

  constructor(
    private blogsAndUsersService: BlogsAndUsersService
  ) { }

  ngOnInit(): void {
    console.log(this.blogsAndUsersService.blogs);
    this.getBlogs();  
  }

  getBlogs(): void {
    this.blogs = this.blogsAndUsersService.getBlogs();
  }
  
  changeEditStatus():void{
    this.editStatus = !this.editStatus;

  }
  editPost(blog: IBlogs): void{
    this.changeEditStatus();
    this.editID = blog.id;
    this.editText = blog.message;
    this.editTitle = blog.topic;
    this.postAuthor = blog.postedBy;
    this.ch = blog.canChange

  }
  savePost():void{
    const updatePost = {
      id: this.editID,
      message: this.editText,
      topic: this.editTitle,
      postedBy: this.postAuthor,
      date: `${this.blogsAndUsersService.dateNow.getHours()}:${this.blogsAndUsersService.dateNow.getMinutes()}, ${this.blogsAndUsersService.dateNow.toLocaleDateString()}`, 
      canChange: this.ch
    };
    this.blogsAndUsersService.editPost(updatePost, this.editID);
    this.changeEditStatus();

  }
  deletePost(blog: IBlogs):void{
    if(confirm('Are you sure?')){
      this.blogsAndUsersService.deletePost(blog.id);
    }
  }
  
  
  


}
