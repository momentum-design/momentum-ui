import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, DebugElement, ViewChild, ElementRef } from '@angular/core';
import { DrawerModule } from '../drawer.module';

describe('DrawerComponent', () => {
  let component: TestDrawerComponent;
  let fixture: ComponentFixture<TestDrawerComponent>;
  let drawerElement: HTMLElement;

  @Component({
    selector: 'test-drawer',
    template: `
      <button #triggerDrawer md-button aria-label="openDrawer" (click)="showMe=true;">
        Open Drawer
      </button>
      <md-drawer [(isOpen)]="showMe" (drawerChanged)="changeDrawer($event)"  >
        <p>Howdy</p>
      </md-drawer>`
  })
  class TestDrawerComponent {
    @ViewChild('triggerDrawer') triggerDrawer: ElementRef<HTMLElement>;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDrawerComponent ],
      imports: [DrawerModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDrawerComponent);
    component = fixture.componentInstance;
    const element = fixture.nativeElement;
    drawerElement = element.querySelector('md-drawer');
    fixture.detectChanges();
  });

  it('should create and match snapshot', () => {
    expect(drawerElement).toBeTruthy();
    expect(drawerElement).toMatchSnapshot();
  });

  it ('should open when triggered', () => {
    const triggerDrawer = fixture.componentInstance.triggerDrawer.nativeElement;
    triggerDrawer.click();
    fixture.detectChanges();
    expect(drawerElement.className).toContain('md-drawer md-drawer--right md-drawer--right--medium ');
  });

});
