import { TestBed, inject } from '@angular/core/testing';

import { BackendCommService } from './backend-comm.service';

describe('BackendCommService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackendCommService]
    });
  });

  it('should be created', inject([BackendCommService], (service: BackendCommService) => {
    expect(service).toBeTruthy();
  }));
});
