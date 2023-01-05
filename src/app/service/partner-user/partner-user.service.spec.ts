import { TestBed } from '@angular/core/testing';

import { PartnerUserService } from './partner-user.service';

describe('PartnerUserService', () => {
  let service: PartnerUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartnerUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
