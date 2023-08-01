import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadsFileComponent } from './downloads-file.component';

describe('DownloadsFileComponent', () => {
  let component: DownloadsFileComponent;
  let fixture: ComponentFixture<DownloadsFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadsFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadsFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
