import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeTripComponent } from './upgrade-trip.component';

describe('UpgradeTripComponent', () => {
  let component: UpgradeTripComponent;
  let fixture: ComponentFixture<UpgradeTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpgradeTripComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgradeTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
