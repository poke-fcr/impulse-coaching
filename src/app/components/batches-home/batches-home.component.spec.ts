import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchesHomeComponent } from './batches-home.component';

describe('BatchesHomeComponent', () => {
  let component: BatchesHomeComponent;
  let fixture: ComponentFixture<BatchesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchesHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
