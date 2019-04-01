import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListItemComponent } from '../list-item.component';
import { CheckboxModule, IconModule, ListItemSectionModule } from 'src/lib/public_api';

describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;
  let listItemNativeElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListItemComponent],
      imports: [CheckboxModule, IconModule, ListItemSectionModule]
    })
      .compileComponents();
  }));

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

  it('should render with default class name', () => {
    component.class = 'custom-class';
    fixture.detectChanges();

    listItemNativeElement = fixture.nativeElement;
    expect(listItemNativeElement.className).toContain(component.class);
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
      'cui-list-item--read-only'
    );
  });

  it('should render the defined type', () => {
    component.type = 'small';
    fixture.detectChanges();

    listItemNativeElement = fixture.nativeElement;
    expect(listItemNativeElement.className).toContain(
      `cui-list-item--${component.type}`
    );
  });
});
