import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionsPageComponentComponent } from './positions-page-component.component';

describe('PositionsPageComponentComponent', () => {
  let component: PositionsPageComponentComponent;
  let fixture: ComponentFixture<PositionsPageComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionsPageComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionsPageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
