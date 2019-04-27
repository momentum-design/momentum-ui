import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListItemHeaderModule } from '../list-item-header.module';

describe('ListItemHeaderComponent', () => {
  @Component({
    selector: 'test-app',
    template: `
      <md-list-item-header header="testHeader" type="space" title="testTitle">
        <button class="test" (click)="onClick()">Test</button>
      </md-list-item-header>
    `,
  })
  class TestAppComponent {
    count = 0;
    onClick() {
      this.count++;
    }
  }

  let testComponent: TestAppComponent;
  let fixture: ComponentFixture<TestAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ListItemHeaderModule],
      declarations: [TestAppComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAppComponent);
    testComponent = fixture.componentInstance;
  });

  it('should create and match snapshot', () => {
    fixture.detectChanges();
    expect(testComponent).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should render one ListItemHeader', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.md-list-item-header');
    expect(element).not.toBeNull();
  });

  it('should render children', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.md-list-item-header');
    expect(element.querySelector('.test')).not.toBeNull();
  });

  it('should handle isReadOnly prop', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.md-list-item-header');
    expect(element.getAttribute('ng-reflect-is-read-only')).toEqual('true');
  });

  it('should allow children to be clicked on', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.md-list-item-header');
    const button = element.querySelector('button');
    button.click();
    expect(testComponent.count).toEqual(1);
  });

  it('should handle type prop', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.md-list-item-header--space');
    expect(element).not.toBeNull();
  });

  it('should handle header prop', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.md-list-item__header');
    expect(element.textContent).toEqual('testHeader');
  });

  it('should handle title prop', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.md-list-item');
    expect(element.getAttribute('title')).toEqual('testTitle');
  });
});
