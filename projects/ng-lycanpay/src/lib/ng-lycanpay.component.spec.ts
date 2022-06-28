import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgLycanpayComponent } from './ng-lycanpay.component';

describe('NgLycanpayComponent', () => {
  let component: NgLycanpayComponent;
  let fixture: ComponentFixture<NgLycanpayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgLycanpayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgLycanpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
