import { TestBed } from '@angular/core/testing';

import { MyGlobalServiceService } from './my-global-service.service';

describe('MyGlobalServiceService', () => {
  let service: MyGlobalServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyGlobalServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
