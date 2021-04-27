import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async,fakeAsync,tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AppComponent } from './app.component';
import { LoaderComponent } from './loader/loader.component';
import { SharedServiceService } from './shared-service.service';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {ButtonModule} from 'primeng/button';
import {ToolbarModule} from 'primeng/toolbar';
import {InputTextModule} from 'primeng/inputtext';
import { ReactiveFormsModule,FormsModule, FormControl, Validators } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ToastModule} from 'primeng/toast';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { FormGroup } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ButtonModule,
        ToolbarModule,
        InputTextModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        CalendarModule,
        ToastModule,
        ProgressSpinnerModule,
        MessagesModule,
        MessageModule
      ],
      declarations: [
        AppComponent,
        LoaderComponent
      ],
      providers:[
        SharedServiceService
      ]
    }).compileComponents();
  }));

  it('should execute signUp call',fakeAsync(()=>{
    let fixture = TestBed.createComponent(AppComponent);
    let component = fixture.debugElement.componentInstance;
    let sharedService = fixture.debugElement.injector.get(SharedServiceService);
    component.userform = new FormGroup({
      'email_address': new FormControl('', Validators.compose([Validators.required,Validators.minLength(6)])),
      'password': new FormControl('', Validators.compose([Validators.required,Validators.minLength(8)])),
      'role': new FormControl('', Validators.compose([Validators.required,Validators.minLength(5)])),
      'name': new FormControl()
    })
    component.userform.setValue({
      email_address:"abc@gmail.com",
      password:"abc1234",
      name:"abc",
      role:"Admin"
    })
    
    let stub = spyOn(sharedService,"signUpService").and.callFake(()=>{
      return of([]).pipe(delay(300));
    })
    component.signUp();
    tick(300);
    expect(component.signUpResult).toEqual([]);
  }))



  it('should execute signIn call',fakeAsync(()=>{
    let fixture = TestBed.createComponent(AppComponent);
    let component = fixture.debugElement.componentInstance;
    let sharedService = fixture.debugElement.injector.get(SharedServiceService);
    component.userform = new FormGroup({
      'email_address': new FormControl('', Validators.compose([Validators.required,Validators.minLength(6)])),
      'password': new FormControl('', Validators.compose([Validators.required,Validators.minLength(8)])),
      'role': new FormControl('', Validators.compose([Validators.required,Validators.minLength(5)])),
      'name': new FormControl()
    })
    component.userform.setValue({
      email_address:"abc@gmail.com",
      password:"abc1234",
      name:"abc",
      role:"Admin"
    })
    
    let stub = spyOn(sharedService,"signInService").and.callFake(()=>{
      return of({records:[]}).pipe(delay(300));
    })
    component.signIn();
    tick(300);
    expect(component.loginScreen).toBeFalsy();
  }))
 
});
