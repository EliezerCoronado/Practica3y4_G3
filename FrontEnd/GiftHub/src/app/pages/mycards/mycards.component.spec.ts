import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GiftcardsService } from 'src/app/services/giftcards.service';

import { MycardsComponent } from './mycards.component';

describe('MycardsComponent', () => {
  let component: MycardsComponent;
  let fixture: ComponentFixture<MycardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MycardsComponent ],
      providers: [ GiftcardsService ],
      imports: [HttpClientModule,RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MycardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
