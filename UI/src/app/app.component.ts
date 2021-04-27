import { Component, OnInit} from '@angular/core';
import {MessageService,FilterUtils } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SharedServiceService } from './shared-service.service';
import { SortEvent } from 'primeng/api';
import * as moment from 'moment';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent implements OnInit {
 name:any;
 signUpResult:any;
 userform:FormGroup;
 loginScreen:boolean;
 adminScreen:boolean;
 generalUser:boolean;
 userDetails:any=[];
 constructor(private messageService: MessageService,private http:HttpClient,private sharedService:SharedServiceService,private fb:FormBuilder) {
    
  
  }
  ngOnInit() {  
   this.loginScreen = true;

  //  filter function to filter the table records
   FilterUtils['custom'] = (value, filter): boolean => {
    if (filter === undefined || filter === null || filter.trim() === '') {
      return true;
    }

    if (value === undefined || value === null) {
      return false;
    }

    return parseInt(filter) > value;
  }

  // Input fields validation
   this.userform = this.fb.group({
    'email_address': new FormControl('', Validators.compose([Validators.required,Validators.minLength(6)])),
    'password': new FormControl('', Validators.compose([Validators.required,Validators.minLength(8)])),
    'role': new FormControl('', Validators.compose([Validators.required,Validators.minLength(5)])),
    'name': new FormControl()
}); 
  }

  /*
  * 1. Read data from user screen
  * 2. call signup service with user data
  * 3. error handling for the service call
  */
  async signUp(){
   let signUpData;
   signUpData = {};
   signUpData.name = this.userform.value.name;
   signUpData.email = this.userform.value.email_address;
   signUpData.password = this.userform.value.password;
   signUpData.role = this.userform.value.role;
   signUpData.createddate = moment(new Date()).format('YYYY-MM-DD');
    await this.sharedService.signUpService(signUpData).toPromise().then(response=>{
      let msg;
      msg=response;
      this.signUpResult = msg;
      this.messageService.add({severity:'success', summary:'SignUp User', detail: msg.message});
      this.userform.reset();
    },error => {
      console.log(error)
      this.messageService.add({severity:'error', summary:'SignUp User', detail:error.error.message});
    })
    
  }

  /*
  * 1. Read data from user screen
  * 2. call signin service with user data
  * 3. error handling for the service call
  */
  async signIn(){
    let email = this.userform.value.email_address;
    let password = this.userform.value.password;
    let role = this.userform.value.role;
    await this.sharedService.signInService(email,password,role).toPromise().then(async response=>{
      let result;
      result = response;
      console.log("sign in response");
      console.log(result)
      // await this.sharedService.getUserService(email,role,result.message).toPromise().then(response=>{
      //   let details;
      //   details = response;
        this.userDetails = result.message;
        this.loginScreen= false;
        this.generalUser = true;
      // },error=>{
        this.messageService.add({severity:'success', summary:'Get Users', detail:"Fetched the records"});
    },error=>{
      console.log(error);
      this.messageService.add({severity:'error', summary:'SignIn User', detail:error.error.message});
    });
  }

  editUserAction(user,dt){
    console.log("edit user")
  }
  deleteByUser(user){
    console.log("delete user")
  }
  saveEdit(user){
    console.log("save user")
  }
  cancelEdit(dt,ri){
    console.log("cancel user")
  }

  // sort function sort table data based on createddate
  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null)
          result = -1;
      else if (value1 != null && value2 == null)
          result = 1;
      else if (value1 == null && value2 == null)
          result = 0;
      else{
          result = (moment(value1).isBefore(value2)) ? -1 : (moment(value1).isAfter(value2)) ? 1 : 0;
      }

      return (event.order * result);
    });
}


}
