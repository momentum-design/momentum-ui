import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsService } from '../tabs/tabs.service';
import { TabsComponent } from './tabs.component';
import { TabsModule } from './tabs.module';
import { Component } from '@angular/core';


describe('TabsComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;

  @Component({
    selector: 'test-app',
    template: `

    <md-tabs
      [focus]="0"
      [className]="tabsClass"
    >
      <md-tab-header [heading]="heading"></md-tab-header>
      <md-tab-list [role]='listRole'>
        <md-tab [className]="tabClass">
          Onboarding
        </md-tab>

        <md-tab [role]="tabRole">
          Subscriptions
        </md-tab>

        <md-tab [disabled]="true">
          Info
        </md-tab>
      </md-tab-list>

      <md-tab-content>
        <md-tab-pane>Pane A1</md-tab-pane>
        <md-tab-pane>Pane A2</md-tab-pane>
        <md-tab-pane>Pane A3</md-tab-pane>
      </md-tab-content>
    </md-tabs>
    `,
  })
  class TestAppComponent {

    heading = 'testHeading';
    listRole = 'tablist';
    tabRole = 'tab';
    tabsClass = 'tabsTestClass';
    tabClass = 'tabTestClass';
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestAppComponent],
      imports: [TabsModule],
      providers: [TabsService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render classname to tabs', () => {
    const fixtureApp = TestBed.createComponent(TestAppComponent);
    fixtureApp.detectChanges();
    const findClass = fixtureApp.nativeElement.querySelector('.tabsTestClass');
    expect(findClass).not.toBeNull();
  });

  it('should render justified', () => {
    component.justified = true;
    fixture.detectChanges();
    const testElement = fixture.nativeElement;
    expect(testElement.className).toContain('md-tab--justified');
  });

  it('should render headerLabel as the role to md-tab-list', () => {
    const fixtureApp = TestBed.createComponent(TestAppComponent);
    fixtureApp.detectChanges();
    const listRole = fixtureApp.nativeElement.querySelector('[role="tablist"]');
    expect(listRole.getAttribute('role')).toContain('tablist');
  });

  it('should render header text to md-tab-header', () => {
    const fixtureApp = TestBed.createComponent(TestAppComponent);
    fixtureApp.detectChanges();
    const headerText = fixtureApp.nativeElement.querySelector('md-tab-header');
    expect(headerText.innerHTML).toContain('testHeading');
  });

  it('should render css class to md-tab', () => {
    const fixtureApp = TestBed.createComponent(TestAppComponent);
    fixtureApp.detectChanges();
    const tabClass = fixtureApp.nativeElement.querySelector('.tabTestClass');
    expect(tabClass).not.toBeNull();
  });

  it('should render a disabled md-tab', () => {
    const fixtureApp = TestBed.createComponent(TestAppComponent);
    fixtureApp.detectChanges();
    const disabled = fixtureApp.nativeElement.querySelector('.disabled');
    expect(disabled).not.toBeNull();
  });

  it('should render headerLabel as role to md-tab-list', () => {
    const fixtureApp = TestBed.createComponent(TestAppComponent);
    fixtureApp.detectChanges();
    const listRole = fixtureApp.nativeElement.querySelector('[role="tablist"]');
    expect(listRole.getAttribute('role')).toContain('tablist');
  });

  it('should render tab as the role to md-tab', () => {
    const fixtureApp = TestBed.createComponent(TestAppComponent);
    fixtureApp.detectChanges();
    const listRole = fixtureApp.nativeElement.querySelector('[role="tab"]');
    expect(listRole.getAttribute('role')).toContain('tab');
  });

  it('should render an opened content pane', () => {
    const fixtureApp = TestBed.createComponent(TestAppComponent);
    fixtureApp.detectChanges();
    const contentPane = fixtureApp.nativeElement.querySelector('.md-tab__content');
    expect(contentPane).not.toBeNull();
  });



});
