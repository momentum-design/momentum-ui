import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributingComponent } from './contributing.component';

describe('ContributingComponent', () => {
  let component: ContributingComponent;
  let fixture: ComponentFixture<ContributingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContributingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
