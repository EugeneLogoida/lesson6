import { Component, OnInit } from '@angular/core';
import { IBlogs } from '../shared/interfaces/blogs.interface';
import { IUsers } from '../shared/interfaces/users.interface';
import { BlogsAndUsersService } from '../shared/services/blogs-and-users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public userControl!:string;

  public signInBool:boolean = false;
  public signUpBool:boolean = false;
  public addPostBool:boolean = false;

  public isLogged:boolean = false;

  public signInInputE!: string;
  public signInInputP!: string;

  public signUpInputU!: string;
  public signUpInputE!: string;
  public signUpInputP!: string;

  public addPostText!: string;
  public addPostTitle!: string;

  public users!: IUsers[];
  public blogs!: IBlogs[];
  public dateNow: Date = new Date();
  public exists: boolean = false;
  

  constructor(
    private blogsAndUsersService: BlogsAndUsersService
  ) { }

  

  ngOnInit(): void {
    this.getUsers();
    this.getBlogs();
  }

  

  getUsers(): void {
    this.users = this.blogsAndUsersService.getUsers();
  }
  getBlogs(): void {
    this.blogs = this.blogsAndUsersService.getBlogs();
  }

  signIn():void{
    this.signInBool = !this.signInBool;
  }
  signUp():void{
    this.signUpBool = !this.signUpBool;
  }
  closeSU():void{
    this.signUp();
    this.signUpInputE = ''
    this.signUpInputP = ''
    this.signUpInputU = ''
  }
  closeSI():void{
    this.signIn();
    this.signInInputE = ''
    this.signInInputP=''
  }


  submitSI():void{
    
    this.users.find(user => {
      if(this.signInInputE == user.email && this.signInInputP == user.password ){
        this.userControl = user.username;
        this.isLogged = true;
      }
    });
    console.log(this.userControl);
    this.closeSI();
    this.checkFunc();
    
  }

  submitSU():void{
    this.users.find(user => {
      if(this.signUpInputE == user.email || this.signUpInputU == user.username){
        this.exists = true; 
      }
    });
    if(!this.exists){
      let newUser={
        id: this.users.length + 1,
        username: this.signUpInputU,
        email: this.signUpInputE, 
        password: this.signUpInputP
      }
      this.blogsAndUsersService.addUser(newUser);
      this.closeSU();
      console.log(this.users);
    }
    else alert('This username or email already exists!');
    this.exists = false
    
    
  }
  addPost():void{
    this.addPostBool = !this.addPostBool;
  }
  closeAP():void{
    this.addPost();
    this.addPostText = ''
    this.addPostTitle = ''
  }
  post():void{
    
    
    let newPost = {
      id: this.blogs.length+1,
      postedBy: this.userControl,
      topic: this.addPostTitle,
      date: `${this.  dateNow.getHours()}:${this.dateNow.getMinutes()}, ${this.dateNow.toLocaleDateString()}`, 
      message: this.addPostText,
      canChange: false
    }
    this.blogsAndUsersService.addPost(newPost);
    this.closeAP();
    this.checkFunc();
  }


  signOut():void{
    this.isLogged = false;
    this.blogs.forEach(blog => {
      blog.canChange = false;
    });
  }

  checkFunc():void{
    this.blogs.forEach(blog => {
      if(blog.postedBy == this.userControl){
        blog.canChange = true;
      }
      if(this.userControl == 'admin'){
        blog.canChange = true;
      }
    });
  }

}
