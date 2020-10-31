import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegalarComponent } from './regalar.component';

describe('RegalarComponent', () => {
  let component: RegalarComponent;
  let fixture: ComponentFixture<RegalarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegalarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegalarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
