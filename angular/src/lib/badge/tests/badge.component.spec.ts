import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BadgeComponent } from '../badge.component';

describe('BadgeComponent', () => {
  let testComponent: BadgeComponent;
  let fixture: ComponentFixture<BadgeComponent>;
  let badgeNativeElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BadgeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeComponent);
    testComponent = fixture.componentInstance;
  });

  it('should create and match snapshot', () => {
    fixture.detectChanges();
    expect(testComponent).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should render one span with default class name', () => {
    fixture.detectChanges();

    badgeNativeElement = fixture.nativeElement;
    const span = badgeNativeElement.querySelector('span');

    expect(span).not.toBeNull();
    expect(span.className).toEqual('cui-badge');
  });

  it('should assign conditional rounded class name', () => {
    testComponent.rounded = true;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();

    badgeNativeElement = fixture.nativeElement;
    const span = badgeNativeElement.querySelector('span');

    expect(span.className).toContain('cui-badge--round');
  });

  it('should not assign conditional rounded class name', () => {
    testComponent.rounded = false;
    fixture.detectChanges();

    badgeNativeElement = fixture.nativeElement;
    const span = badgeNativeElement.querySelector('span');

    expect(span.className).not.toContain('cui-badge--round');
  });

  it('should assign conditional color class name', () => {
    testComponent.color = 'blue';
    fixture.detectChanges();

    badgeNativeElement = fixture.nativeElement;
    const span = badgeNativeElement.querySelector('span');

    expect(span.className).toContain('cui-badge--blue');
  });

  it('should not assign conditional color class name', () => {
    fixture.detectChanges();

    badgeNativeElement = fixture.nativeElement;
    const span = badgeNativeElement.querySelector('span');

    expect(span.className).not.toContain('cui-badge--blue');
  });
});
