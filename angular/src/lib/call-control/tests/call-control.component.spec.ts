import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { CallControlModule } from '../call-control.module';

describe('CallControlComponent', () => {
  @Component({
    selector: 'test-app',
    template: `
      <md-call-control
        id="test-default"
        [type]="type"
        ariaLabel="For the Win"
        size=20
        [iconColor]="iconColor"
        [iconSize]="iconSize"
        (click)="onClick()"
      ></md-call-control>

      <md-call-control
        id="test-active"
        [type]="type"
        ariaLabel="For the Win"
        [active]="true"
      ></md-call-control>

      <md-call-control
        id="test-disabled"
        [type]="type"
        ariaLabel="For the Win"
        [disabled]="true"
      ></md-call-control>
    `,
  })
  class TestAppComponent {
    count = 0;
    iconColor = 'white-100';
    iconSize = 20;
    type = 'microphone-muted';
    onClick() {
      this.count++;
    }
  }

  let component: TestAppComponent;
  let fixture: ComponentFixture<TestAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestAppComponent],
      imports: [CallControlModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should match snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should render one Call Control button', () => {
    const element: HTMLBaseElement = fixture.nativeElement.querySelector('#test-default');
    expect(element.nodeName).toEqual('BUTTON');
  });

  it('should handle disabled state', () => {
    const element: HTMLBaseElement = fixture.nativeElement.querySelector('#test-disabled');
    expect(element.getAttribute('disabled')).toEqual('true');
  });

  it('should handle click event', () => {
    const element: HTMLBaseElement = fixture.nativeElement.querySelector('#test-default');
    element.click();
    expect(component.count).toEqual(1);
  });

  describe('tests for type prop', () => {
    it('should render activities type', () => {
      component.type = 'activities';
      fixture.detectChanges();
      const element: HTMLBaseElement = fixture.nativeElement.querySelector('#test-disabled');
      const icon = element.querySelector('md-icon');
      expect(icon.getAttribute('ng-reflect-name')).toEqual('activities_24');
    });

    it('should render camera type', () => {
      component.type = 'camera';
      fixture.detectChanges();
      const element: HTMLBaseElement = fixture.nativeElement.querySelector('#test-disabled');
      const icon = element.querySelector('md-icon');
      expect(icon.getAttribute('ng-reflect-name')).toEqual('camera_24');
    });

    it('should render camera-muted type', () => {
      component.type = 'camera-muted';
      fixture.detectChanges();
      const element: HTMLBaseElement = fixture.nativeElement.querySelector('#test-disabled');
      const icon = element.querySelector('md-icon');
      expect(icon.getAttribute('ng-reflect-name')).toEqual('camera-muted_24');
    });

    it('should render camera-muted type', () => {
      component.type = 'camera-muted';
      fixture.detectChanges();
      const element: HTMLBaseElement = fixture.nativeElement.querySelector('#test-disabled');
      const icon = element.querySelector('md-icon');
      expect(icon.getAttribute('ng-reflect-name')).toEqual('camera-muted_24');
    });

    it('should render cancel type', () => {
      component.type = 'cancel';
      fixture.detectChanges();
      const element: HTMLBaseElement = fixture.nativeElement.querySelector('#test-disabled');
      const icon = element.querySelector('md-icon');
      expect(icon.getAttribute('ng-reflect-name')).toEqual('cancel_24');
    });

    it('should render handset type', () => {
      component.type = 'handset';
      fixture.detectChanges();
      const element: HTMLBaseElement = fixture.nativeElement.querySelector('#test-disabled');
      const icon = element.querySelector('md-icon');
      expect(icon.getAttribute('ng-reflect-name')).toEqual('handset_24');
    });

    it('should render microphone-muted type', () => {
      component.type = 'microphone-muted';
      fixture.detectChanges();
      const element: HTMLBaseElement = fixture.nativeElement.querySelector('#test-disabled');
      const icon = element.querySelector('md-icon');
      expect(icon.getAttribute('ng-reflect-name')).toEqual('microphone-muted_24');
    });

    it('should render more type', () => {
      component.type = 'more';
      fixture.detectChanges();
      const element: HTMLBaseElement = fixture.nativeElement.querySelector('#test-disabled');
      const icon = element.querySelector('md-icon');
      expect(icon.getAttribute('ng-reflect-name')).toEqual('more_24');
    });

    it('should render participant-list type', () => {
      component.type = 'participant-list';
      fixture.detectChanges();
      const element: HTMLBaseElement = fixture.nativeElement.querySelector('#test-disabled');
      const icon = element.querySelector('md-icon');
      expect(icon.getAttribute('ng-reflect-name')).toEqual('participant-list_24');
    });

    it('should render share-screen type', () => {
      component.type = 'share-screen';
      fixture.detectChanges();
      const element: HTMLBaseElement = fixture.nativeElement.querySelector('#test-disabled');
      const icon = element.querySelector('md-icon');
      expect(icon.getAttribute('ng-reflect-name')).toEqual('share-screen_24');
    });

    it('should render speaker type', () => {
      component.type = 'speaker';
      fixture.detectChanges();
      const element: HTMLBaseElement = fixture.nativeElement.querySelector('#test-disabled');
      const icon = element.querySelector('md-icon');
      expect(icon.getAttribute('ng-reflect-name')).toEqual('speaker_24');
    });

    it('should render speaker type', () => {
      component.type = 'speaker';
      fixture.detectChanges();
      const element: HTMLBaseElement = fixture.nativeElement.querySelector('#test-disabled');
      const icon = element.querySelector('md-icon');
      expect(icon.getAttribute('ng-reflect-name')).toEqual('speaker_24');
    });
  });

  it('should handle iconSize of 10', () => {
    component.iconSize = 10;
    fixture.detectChanges();
    const element: HTMLBaseElement = fixture.nativeElement.querySelector('#test-default');
    const icon: HTMLBaseElement = element.querySelector('md-icon');
    expect(icon.getAttribute('ng-reflect-name')).toEqual('microphone-muted_10');
  });

  it('should handle iconSize of 16', () => {
    component.iconSize = 16;
    fixture.detectChanges();
    const element: HTMLBaseElement = fixture.nativeElement.querySelector('#test-default');
    const icon: HTMLBaseElement = element.querySelector('md-icon');
    expect(icon.getAttribute('ng-reflect-name')).toEqual('microphone-muted_16');
  });

  it('should handle iconColor prop', () => {
    component.iconColor = 'green-50';
    fixture.detectChanges();
    const element: HTMLBaseElement = fixture.nativeElement.querySelector('#test-default');
    const icon: HTMLBaseElement = element.querySelector('md-icon');
    expect(icon.getAttribute('ng-reflect-color')).toEqual('green-50');
  });

});
