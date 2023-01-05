import { TestBed } from '@angular/core/testing';

import { EncapService } from './encap.service';

describe('EncapService', () => {
  let service: EncapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
