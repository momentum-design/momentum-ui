import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { BadgeComponent } from '../badge.component';

@Component({
  template: `
    <md-badge
      [ngClass]="'first second'"
      class="third fourth"
      color="blue"
      [rounded]="true"
      >Testing Classes</md-badge
    >
  `,
})
class TestHostComponent {}

describe('BadgeComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BadgeComponent, TestHostComponent],
    }).compileComponents();
  }));

  describe('Default, Rounded and Colors', () => {
    let testComponent: BadgeComponent;
    let fixture: ComponentFixture<BadgeComponent>;
    let badgeNativeElement: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(BadgeComponent);
      testComponent = fixture.componentInstance;
    });

    it('should create and match snapshot', () => {
      fixture.detectChanges();
      expect(testComponent).toBeTruthy();
      expect(fixture).toMatchSnapshot();
    });

    it('should render one md-badge element with default class name', () => {
      fixture.detectChanges();

      badgeNativeElement = fixture.nativeElement;
      expect(badgeNativeElement.className).toEqual('md-badge');
    });

    it('should assign conditional rounded class name', () => {
      testComponent.rounded = true;
      fixture.detectChanges();
      expect(fixture).toMatchSnapshot();

      badgeNativeElement = fixture.nativeElement;
      expect(badgeNativeElement.className).toContain('md-badge--round');
    });

    it('should not assign conditional rounded class name', () => {
      testComponent.rounded = false;
      fixture.detectChanges();

      badgeNativeElement = fixture.nativeElement;
      expect(badgeNativeElement.className).not.toContain('md-badge--round');
    });

    it('should assign conditional color class name', () => {
      testComponent.color = 'blue';
      fixture.detectChanges();
      expect(fixture).toMatchSnapshot();

      badgeNativeElement = fixture.nativeElement;
      expect(badgeNativeElement.className).toContain('md-badge--blue');
    });

    it('should update conditional color class name if color is updated', () => {
      testComponent.color = 'red';
      fixture.detectChanges();

      badgeNativeElement = fixture.nativeElement;
      expect(badgeNativeElement.className).toContain('md-badge--red');

      testComponent.color = 'blue';
      fixture.detectChanges();

      expect(badgeNativeElement.className).not.toContain('md-badge--red');
      expect(badgeNativeElement.className).toContain('md-badge--blue');
    });

    it('should not assign conditional color class name', () => {
      fixture.detectChanges();

      badgeNativeElement = fixture.nativeElement;
      expect(badgeNativeElement.className).not.toContain('md-badge--blue');
    });

    it('should not assign conditional color class name', () => {
      fixture.detectChanges();

      badgeNativeElement = fixture.nativeElement;
      expect(badgeNativeElement.className).not.toContain('md-badge--blue');
    });
  });

  describe('Classes and ngClass', () => {
    let testHost: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;

    it('should pass classNames to the component', () => {
      fixture = TestBed.createComponent(TestHostComponent);
      testHost = fixture.componentInstance;
      const badge = fixture.nativeElement.querySelector('md-badge');
      fixture.detectChanges();
      expect(fixture).toMatchSnapshot();

      expect(badge.className).toContain('md-badge--blue');
      expect(badge.className).toContain('md-badge--round');
      expect(badge.className).toContain('first second');
      expect(badge.className).toContain('third fourth');
    });
  });
});
