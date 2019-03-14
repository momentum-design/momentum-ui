import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListSeparatorComponent } from '../list-separator.component';
import { ListSeparatorModule } from '../list-separator.module';

describe('ListSeparatorComponent', () => {
  let testComponent: ListSeparatorComponent;
  let fixture: ComponentFixture<ListSeparatorComponent>;

  @Component({
    selector: 'test-app',
    template: `
      <cui-list-separator class="right">
        <div>Test</div>
      </cui-list-separator>
    `,
  })
  class TestAppComponent { }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestAppComponent],
      imports: [ListSeparatorModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSeparatorComponent);
    testComponent = fixture.componentInstance;
  });

  it('should match snapshot', () => {
    fixture.detectChanges();
    expect(testComponent).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should render one ListSeparator', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.className).toContain('cui-list-separator');
  });

  it('should render text prop', () => {
    testComponent.text = 'Today';
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.cui-list-separator__text');
    expect(element).not.toBeNull();
    expect(element.textContent).toEqual('Today');
  });

  it('should change the background color', () => {
    testComponent.backgroundColor = 'transparent';
    fixture.detectChanges();
    expect(fixture.nativeElement.style['background-color']).toEqual('transparent');
  });

  it('should change the line color', () => {
    testComponent.lineColor = 'red';
    fixture.detectChanges();
    expect(fixture.nativeElement.style.color).toEqual('red');
  });

  it('should add padding to the text prop', () => {
    testComponent.text = 'Today';
    testComponent.textPadding = '40px';
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.cui-list-separator__text');
    expect(element.style.padding).toEqual('40px');
  });

  it('should change the text color', () => {
    testComponent.text = 'Today';
    testComponent.textColor = 'green';
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.cui-list-separator__text');
    expect(element.style.color).toEqual('green');
  });

  it('should handle class prop', () => {
    const fixtureApp = TestBed.createComponent(TestAppComponent);
    fixtureApp.detectChanges();
    const element = fixtureApp.nativeElement.querySelector('cui-list-separator');
    expect(element.className).toContain('right');
  });

  it('should render children', () => {
    const fixtureApp = TestBed.createComponent(TestAppComponent);
    fixtureApp.detectChanges();
    const element = fixtureApp.nativeElement.querySelector('cui-list-separator');
    expect(element.children.length).toEqual(1);
  });
});
