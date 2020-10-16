import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { GiftcardsService } from './giftcards.service';

describe('GiftcardsService', () => {
  let service: GiftcardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(GiftcardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
