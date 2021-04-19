import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { SharedServiceService } from './shared-service.service';

describe('SharedServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: SharedServiceService = TestBed.get(SharedServiceService);
    expect(service).toBeTruthy();
  });
});
