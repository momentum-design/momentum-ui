import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from '../list.component';
import {
  IconModule,
  ListItemModule,
  ListItemSectionModule,
} from 'src/lib/public_api';

@Component({
  template: `
    <md-list
      [ngClass]="'custom-ng-class'"
      class="custom-class"
      id="1234"
      tabType="horizontal"
      type="small"
      itemRole="my-list-item"
      role="list-box"
      [wrap]="true"
      (select)="onSelect($event)"
      >
      <div md-list-item label='List Item A'></div>
      <div md-list-item label='List Item B'></div>
    </md-list>
  `
})
class TestHostComponent {}

describe('ListComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let listComponent: ListComponent;
  let listNativeElement: HTMLElement;
  let testHost: TestHostComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComponent, TestHostComponent ],
      imports: [
        IconModule,
        ListItemModule,
        ListItemSectionModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    listComponent = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create and match snapshot', () => {
    fixture.detectChanges();
    expect(testHost).toBeTruthy();
    expect(listComponent).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should render with default class names in addition to generated class names from props', () => {
    fixture.detectChanges();

    listNativeElement = fixture.nativeElement;
    const list = listNativeElement.querySelector('md-list');
    expect(list).not.toBeNull();
    expect(list.className).toContain('custom-ng-class');
    expect(list.className).toContain('custom-ng-class');
    expect(list.className).toContain('custom-class');
    expect(list.className).toContain('md-list--wrap');
    expect(list.className).toContain('md-list--horizontal');
  });
});
