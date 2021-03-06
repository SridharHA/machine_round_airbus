import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit,OnDestroy{

  progressSpinnerCtrl: boolean;
  constructor(private loaderService: SharedServiceService) { }

  ngOnInit() {
    this.progressSpinnerCtrl = false;
    this.loaderService.loaderEmitter.subscribe(response => {
      this.progressSpinnerCtrl = response;
    });
  }

  ngOnDestroy(): void {
    this.loaderService.loaderEmitter.unsubscribe();
  }
}
