import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListItemComponent } from '../list-item.component';
import { CheckboxModule, IconModule, ListItemSectionModule } from 'src/lib/public_api';

@Component({
  template: `
    <div
      md-list-item
      [ngClass]="'my-ng-class'"
      class="custom-class"
      label='List Item A'
      [disabled]="true"
      [isReadOnly]="true"
      [separator]="true"
      title="my-title"
      type="small"
      ></div>
  `
})
class TestHostComponent {}

describe('ListItemComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListItemComponent, TestHostComponent ],
      imports: [CheckboxModule, IconModule, ListItemSectionModule]
    })
      .compileComponents();
  }));

  describe('main tests', () => {
    let component: ListItemComponent;
    let fixture: ComponentFixture<ListItemComponent>;
    let listItemNativeElement: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(ListItemComponent);
      component = fixture.componentInstance;
      component.label = 'myLabel';
      fixture.detectChanges();
    });

    it('should create and match snapshot', () => {
      expect(component).toBeTruthy();
      expect(fixture).toMatchSnapshot();
    });

    it('should render with disabled class when defined', () => {
      component.disabled = true;
      fixture.detectChanges();

      listItemNativeElement = fixture.nativeElement;
      expect(listItemNativeElement.className).toContain('disabled');
    });

    it('should render as readOnly when defined', () => {
      component.isReadOnly = true;
      fixture.detectChanges();

      listItemNativeElement = fixture.nativeElement;
      expect(listItemNativeElement.className).toContain(
        'md-list-item--read-only'
      );
    });
  });

  describe('with HostComponent', () => {
    let testHost: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;

    it('should pass classNames to the component', () => {
      fixture = TestBed.createComponent(TestHostComponent);
      testHost = fixture.componentInstance;
      const listItem = fixture.nativeElement.querySelector('.md-list-item');
      fixture.detectChanges();

      expect(fixture).toMatchSnapshot();
      expect(listItem.className).toContain(`md-list-item`);
      expect(listItem.className).toContain('my-ng-class');
      expect(listItem.className).toContain('custom-class');
    });

    it('should render the defined type', () => {
      fixture = TestBed.createComponent(TestHostComponent);
      testHost = fixture.componentInstance;
      const listItem = fixture.nativeElement.querySelector('.md-list-item');
      fixture.detectChanges();
      expect(fixture).toMatchSnapshot();

      expect(listItem.className).toContain(`md-list-item--small`);
    });

    it('should render the passed in props within testComponent template', () => {
      fixture = TestBed.createComponent(TestHostComponent);
      testHost = fixture.componentInstance;
      const listItem = fixture.nativeElement.querySelector('.md-list-item');
      fixture.detectChanges();
      expect(fixture).toMatchSnapshot();

      expect(listItem.className).toContain(`md-list-item--separator`);
      expect(listItem.className).toContain(`md-list-item--read-only`);
      expect(listItem.className).toContain(`disabled`);
    });
  });
});
