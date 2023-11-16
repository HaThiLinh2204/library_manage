import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedBookComponent } from './updated-book.component';

describe('UpdatedBookComponent', () => {
  let component: UpdatedBookComponent;
  let fixture: ComponentFixture<UpdatedBookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatedBookComponent]
    });
    fixture = TestBed.createComponent(UpdatedBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
