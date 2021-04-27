import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoaderComponent } from './loader.component';
import { SharedServiceService } from '../shared-service.service';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ RouterTestingModule,
        HttpClientTestingModule,
        ProgressSpinnerModule],
      declarations: [ LoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create loader component', () => {
    expect(component).toBeTruthy();
  });

  it('check initial value of progressSpinnerCtrl', () => {
    component.ngOnInit();
    expect(component.progressSpinnerCtrl).toBeFalsy();
  });

  it('check value of progressSpinnerCtrl after subscription', () => {
    let sharedService = fixture.debugElement.injector.get(SharedServiceService);
    sharedService.loaderEmitter.next(true);
    expect(component.progressSpinnerCtrl).toBeTruthy();
  });
});
