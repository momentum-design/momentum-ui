import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from '../list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let listNativeElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and match snapshot', () => {
    expect(component).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should render with default class name', () => {
    component.class = 'custom-class';
    fixture.detectChanges();

    listNativeElement = fixture.nativeElement;
    expect(listNativeElement.className).toContain(component.class);
  });

  it('should render with defined tab type', () => {
    component.tabType = 'horizontal';
    fixture.detectChanges();

    listNativeElement = fixture.nativeElement;
    expect(listNativeElement.className).toContain(`cui-list--${component.tabType}`);
  });

  it('should render with defined wrapped state', () => {
    component.wrap = true;
    fixture.detectChanges();

    listNativeElement = fixture.nativeElement;
    expect(listNativeElement.className).toContain('cui-list--wrap');
  });
});
