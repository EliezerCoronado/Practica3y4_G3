import { TestBed } from '@angular/core/testing';

import { GiftcardsService } from './giftcards.service';

describe('GiftcardsService', () => {
  let service: GiftcardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GiftcardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
