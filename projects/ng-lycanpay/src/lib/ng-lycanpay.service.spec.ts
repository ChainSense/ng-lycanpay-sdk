import { TestBed } from '@angular/core/testing';

import { NgLycanpayService } from './ng-lycanpay.service';

describe('NgLycanpayService', () => {
  let service: NgLycanpayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgLycanpayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
