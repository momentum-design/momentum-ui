import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Overlay, OverlayContainer } from '@angular/cdk/overlay';
import { CoachmarkService } from '../coachmark.service';
import { CoachmarkComponent } from '../coachmark.component';
import { ViewContainerRef } from '@angular/core';

describe('CoachmarkComponent', () => {
  let component: CoachmarkComponent;
  let fixture: ComponentFixture<CoachmarkComponent>;
  let testElement: HTMLElement;
  let archor: HTMLElement;
  let testService: Overlay;
  let overlayContainer: OverlayContainer;

  beforeEach(() => TestBed.configureTestingModule({
    declarations: [CoachmarkComponent],
    providers: [CoachmarkService, Overlay, OverlayContainer, ViewContainerRef]
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachmarkComponent);
    component = fixture.componentInstance;
    archor = document.createElement('A');
    archor.innerHTML = 'archor';
    fixture.detectChanges();
  });


  it('should create and match snapshot', () => {
    expect(component).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should run service Overlay', () => {
    component.ngAfterContentInit();
    component.ngAfterViewInit();
    fixture.detectChanges();
    testElement = fixture.nativeElement;
    testService = TestBed.get(Overlay);
    expect(testService).toBeTruthy();
  });

  it('should render className', () => {
    component.className = 'longlonglonglongName' ;
    component.ngAfterContentInit();
    component.ngAfterViewInit();
    component.show();
    overlayContainer = TestBed.get(OverlayContainer);
    fixture.detectChanges();
    testElement = fixture.nativeElement;
    testService = TestBed.get(Overlay);
    expect(overlayContainer.getContainerElement().innerHTML).toContain(component.className);
  });


});
