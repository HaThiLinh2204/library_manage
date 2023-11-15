import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsideLoginComponent } from './inside-login.component';

describe('InsideLoginComponent', () => {
  let component: InsideLoginComponent;
  let fixture: ComponentFixture<InsideLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsideLoginComponent]
    });
    fixture = TestBed.createComponent(InsideLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
