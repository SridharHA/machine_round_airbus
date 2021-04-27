import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { SharedServiceService } from './shared-service.service';

describe('SharedServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('shared service should be created', () => {
    const service: SharedServiceService = TestBed.get(SharedServiceService);
    expect(service).toBeTruthy();
  });

  it('shared service signup http call', () => {
    const service: SharedServiceService = TestBed.get(SharedServiceService);
    let user:any;
    user = {};
    user.email = 'abc@gmail.com';
    user.password = 'abc1234';
    user.role = 'Admin';
    user.name = 'abc';
    user.createddate = '12/02/2021'
    let signUpResult;
    let stub = spyOn(service,"signUpService").and.returnValue(of({statusCode:200,message:"success"}));
    service.signUpService(user).subscribe(response=>{
      signUpResult = response;
    })
    expect(signUpResult.statusCode).toEqual(200);
  });

  it('shared service signin http call', () => {
    const service: SharedServiceService = TestBed.get(SharedServiceService);
    
    let email = 'abc@gmail.com';
    let password = 'abc1234';
    let role = 'General';
    let signInResult;
    let stub = spyOn(service,"signInService").and.returnValue(of({statusCode:200,message:{Items:[{name:'abc',created_date:'12/03/2021',role:'General',email_address:'abc@gmail.com'}]}}));
    service.signInService(email,password,role).subscribe(response=>{
      signInResult = response;
    })
    expect(signInResult.statusCode).toEqual(200);
  });
});
