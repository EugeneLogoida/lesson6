import { Injectable } from '@angular/core';
import { IBlogs } from '../interfaces/blogs.interface';
import { IUsers } from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogsAndUsersService {

  public dateNow: Date = new Date();

  public blogs: Array<IBlogs> = [
    {
      id: 1,
      postedBy: "admin",
      topic: 'First post',
      date: `${this.dateNow.getHours()}:${this.dateNow.getMinutes()}, ${this.dateNow.toLocaleDateString()}`, 
      message: 'Sign up to create', 
      canChange: false
    }
  ];
  public users: Array<IUsers> = [{
    id: 1,
    username: 'admin',
    email: 'admin@gmail.com', 
    password: 'admin'
  }];

  constructor() { }

  getBlogs(): Array<IBlogs> {
    return this.blogs;
  }
  getUsers(): Array<IUsers>{
    return this.users;
  }

  addUser(user: IUsers): void {
    this.users.push(user);
  }
  addPost(post: IBlogs): void{
    this.blogs.push(post);
  }

  editPost(post: IBlogs, id: number): void {
    const index = this.blogs.findIndex(post => post.id === id);
    this.blogs.splice(index, 1, post);
  }

  deletePost(id: number): void {
    const index = this.blogs.findIndex(post => post.id === id);
    this.blogs.splice(index, 1);
  }
}
