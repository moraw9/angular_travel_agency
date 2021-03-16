import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipeContolerComponent } from './pipe-contoler.component';

describe('PipeContolerComponent', () => {
  let component: PipeContolerComponent;
  let fixture: ComponentFixture<PipeContolerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipeContolerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PipeContolerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
