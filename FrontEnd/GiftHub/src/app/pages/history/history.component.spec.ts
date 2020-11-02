import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { GiftcardsService } from 'src/app/services/giftcards.service';

import { HistoryComponent } from './history.component';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryComponent ],
      providers: [ GiftcardsService ],
      imports: [FormsModule,ReactiveFormsModule,HttpClientModule,RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('comprueba que no sea el admin', () => {
    component.isAdmin=false;
    expect(component.isAdmin).toBeFalse();
  });
  
  it('comprueba que no sea el admin', () => {

    component.isAdmin = true;
    expect(component.isAdmin).toBeTrue();
  });
  


});
